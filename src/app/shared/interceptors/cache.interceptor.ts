import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, finalize } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';
import { CookieService } from '../services/cookie.service';

/**
 * HTTP Cache Interceptor
 * 
 * Implements intelligent HTTP response caching with:
 * - Cache-first strategy for GET/HEAD requests
 * - In-flight request deduplication via shareReplay()
 * - CSRF token injection for state-changing operations
 * - Automatic cache invalidation for POST/PUT/DELETE requests
 * - Service-level cache with TTL expiration
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cacheService = inject(CacheService);
  private cookieService = inject(CookieService);

  // Track in-flight requests to prevent duplicates
  private inFlightRequests = new Map<string, Observable<HttpEvent<unknown>>>();

  // Cacheable methods (only GET and HEAD)
  private readonly CACHEABLE_METHODS = ['GET', 'HEAD'];

  // Non-cacheable endpoints (patterns to exclude from caching)
  private readonly EXCLUDED_PATTERNS = [
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/register',
    '/api/auth/refresh',
    '/api/payment',
    '/api/checkout',
    '/websocket',
    '.json' // Config files
  ];

  // Cache TTL defaults (in milliseconds)
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly API_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add CSRF token to state-changing requests
    if (!this.CACHEABLE_METHODS.includes(request.method)) {
      request = this.addCSRFToken(request);
    }

    // For GET/HEAD requests, try cache-first strategy
    if (this.CACHEABLE_METHODS.includes(request.method) && this.isCacheable(request)) {
      return this.handleCacheableRequest(request, next);
    }

    // For other requests, invalidate related caches
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      this.invalidateRelatedCaches(request);
    }

    return next.handle(request);
  }

  /**
   * Handle cacheable requests with deduplication and conditional requests
   */
  private handleCacheableRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cacheKey = this.generateCacheKey(request);

    // Check for in-flight request (deduplication)
    if (this.inFlightRequests.has(cacheKey)) {
      return this.inFlightRequests.get(cacheKey)!;
    }

    // Check for cached response
    const cached = this.cacheService.get<HttpResponse<unknown>>(cacheKey);
    if (cached) {
      return of(cached);
    }

    // Make the request with shareReplay to avoid duplicates
    const request$ = next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Cache successful responses
          if (this.isCacheableResponse(event)) {
            const ttl = this.extractCacheTTL(event);
            this.cacheService.set(cacheKey, event, ttl);
          }
        }
      }),
      finalize(() => {
        // Clean up in-flight request on completion
        this.inFlightRequests.delete(cacheKey);
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    );

    // Store in-flight request
    this.inFlightRequests.set(cacheKey, request$);

    return request$;
  }

  /**
   * Add CSRF token to request headers for state-changing operations
   */
  private addCSRFToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const csrfToken = this.cookieService.getCSRFToken();
    if (csrfToken) {
      return request.clone({
        setHeaders: {
          'X-CSRF-Token': csrfToken
        }
      });
    }
    return request;
  }

  /**
   * Check if request is cacheable
   */
  private isCacheable(request: HttpRequest<unknown>): boolean {
    // Only cache GET and HEAD
    if (!this.CACHEABLE_METHODS.includes(request.method)) {
      return false;
    }

    // Exclude specific patterns
    for (const pattern of this.EXCLUDED_PATTERNS) {
      if (request.url.includes(pattern)) {
        return false;
      }
    }

    // Don't cache if Cache-Control: no-cache
    const cacheControl = request.headers.get('Cache-Control');
    if (cacheControl && cacheControl.includes('no-cache')) {
      return false;
    }

    return true;
  }

  /**
   * Check if response is cacheable (successful status + content)
   */
  private isCacheableResponse(response: HttpResponse<unknown>): boolean {
    // Only cache successful responses
    if (response.status < 200 || response.status >= 300) {
      return false;
    }

    // Don't cache if server says not to
    const cacheControl = response.headers.get('cache-control');
    if (cacheControl && (cacheControl.includes('no-cache') || cacheControl.includes('no-store'))) {
      return false;
    }

    return true;
  }

  /**
   * Extract TTL from Cache-Control header or use default
   */
  private extractCacheTTL(response: HttpResponse<unknown>): number {
    const cacheControl = response.headers.get('cache-control');
    if (cacheControl) {
      const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
      if (maxAgeMatch) {
        return parseInt(maxAgeMatch[1], 10) * 1000; // Convert to milliseconds
      }
    }

    // Default TTLs based on endpoint
    if (response.url && response.url.includes('/api/products')) {
      return 60 * 60 * 1000; // 1 hour
    }
    if (response.url && response.url.includes('/api/categories')) {
      return 24 * 60 * 60 * 1000; // 24 hours
    }
    if (response.url && response.url.includes('/api/orders')) {
      return 15 * 60 * 1000; // 15 minutes
    }

    return this.API_CACHE_TTL; // 10 minutes default
  }

  /**
   * Generate cache key from request URL and query params
   */
  private generateCacheKey(request: HttpRequest<unknown>): string {
    const url = request.url;
    const params = request.params.keys()
      .sort()
      .map(key => `${key}=${request.params.get(key)}`)
      .join('&');

    return params ? `http:${url}?${params}` : `http:${url}`;
  }

  /**
   * Invalidate related caches on state-changing operations
   */
  private invalidateRelatedCaches(request: HttpRequest<unknown>): void {
    const url = request.url.toLowerCase();

    if (url.includes('/products') || url.includes('/categories')) {
      this.cacheService.invalidate('product:*');
      this.cacheService.invalidate('category:*');
      this.cacheService.invalidate('search:*');
    }

    if (url.includes('/cart')) {
      this.cacheService.invalidate('cart:*');
    }

    if (url.includes('/orders')) {
      this.cacheService.invalidate('order:*');
      this.cacheService.invalidate('order:statistics');
    }

    if (url.includes('/auth')) {
      this.cacheService.invalidate('auth:*');
      this.cacheService.invalidate('user:*');
    }

    if (url.includes('/coupon') || url.includes('/discount')) {
      this.cacheService.invalidate('coupon:*');
      this.cacheService.invalidate('discount:*');
    }
  }
}
