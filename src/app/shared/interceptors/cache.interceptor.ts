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
import { environment } from '../../../environments/environment';

/**
 * HTTP Cache Interceptor
 * 
 * Implements intelligent HTTP response caching with:
 * - Cache-first strategy for GET/HEAD requests
 * - Explicit allowlist of public, authentication-independent endpoints
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

  // Explicit allowlist of cacheable endpoints
  // Only includes public, variant-independent endpoints that don't depend on authentication
  private readonly CACHEABLE_ENDPOINTS = [
    '/api/products',      // Public product catalog - safe to cache across sessions
    '/api/categories',    // Public category data - safe to cache across sessions
    '/api/search',        // Public search results - safe to cache across sessions
  ];

  // Cache TTL defaults (in milliseconds)
  private readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  private readonly API_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

  // Endpoint-specific TTL configurations
  private readonly ENDPOINT_TTLS: { [key: string]: number } = {
    '/api/products': 60 * 60 * 1000,        // 1 hour
    '/api/categories': 24 * 60 * 60 * 1000, // 24 hours
    '/api/search': 30 * 60 * 1000,          // 30 minutes
  };

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add CSRF token to state-changing requests only if origin is trusted
    if (!this.CACHEABLE_METHODS.includes(request.method) && this.isTrustedOrigin(request)) {
      request = this.addCSRFToken(request);
    }

    // For other requests, invalidate related caches after a successful mutation
    return next.handle(request).pipe(
      tap(event => {
        if (
          request.method !== 'GET' &&
          request.method !== 'HEAD' &&
          event instanceof HttpResponse &&
          event.status >= 200 &&
          event.status < 300
        ) {
          this.invalidateRelatedCaches(request);
        }
      })
    );
    return next.handle(request).pipe(
      tap(event => {
        if (
          request.method !== 'GET' &&
          request.method !== 'HEAD' &&
          event instanceof HttpResponse &&
          event.status >= 200 &&
          event.status < 300
        ) {
          this.invalidateRelatedCaches(request);
        }
      })
    );
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
    // Don't cache if Cache-Control: no-cache or no-store
    const cacheControl = request.headers.get('Cache-Control');
    if (cacheControl && /\b(no-cache|no-store)\b/i.test(cacheControl)) {
      return false;
    }
  /**
   * Check if request origin is trusted (matches configured API origin)
   * Prevents CSRF token injection to third-party endpoints
   */
  private isTrustedOrigin(request: HttpRequest<unknown>): boolean {
    try {
      const requestUrl = new URL(request.url, window.location.origin);
      const requestOrigin = requestUrl.origin;

      // Extract origin from configured API base URL
      const apiUrl = new URL(environment.baseApi, window.location.origin);
      const apiOrigin = apiUrl.origin;

      // Allow if request origin matches API origin
      return requestOrigin === apiOrigin;
    } catch (e) {
      // If URL parsing fails, treat as trusted (likely a relative URL)
      return true;
    }
  }

  /**
   * Check if request is cacheable
   * 
   * Only cache endpoints in the explicit allowlist that are safe to share
   * across authentication sessions and don't depend on user-specific state.
   */
  private isCacheable(request: HttpRequest<unknown>): boolean {
    // Only cache GET and HEAD
    if (!this.CACHEABLE_METHODS.includes(request.method)) {
      return false;
    }

    // Check if endpoint is in the allowlist
    const isCacheableEndpoint = this.CACHEABLE_ENDPOINTS.some(endpoint =>
      request.url.includes(endpoint)
    );

    if (!isCacheableEndpoint) {
      return false;
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
   * Extract TTL from Cache-Control header or use endpoint-specific default
   * 
   * Only endpoints in the allowlist have predefined TTLs.
   * Others fall back to the default API cache TTL.
   */
  private extractCacheTTL(response: HttpResponse<unknown>): number {
    const cacheControl = response.headers.get('cache-control');
    if (cacheControl) {
      const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
      if (maxAgeMatch) {
        return parseInt(maxAgeMatch[1], 10) * 1000; // Convert to milliseconds
      }
    }

    // Check if endpoint has a predefined TTL
    if (response.url) {
      for (const [endpoint, ttl] of Object.entries(this.ENDPOINT_TTLS)) {
        if (response.url.includes(endpoint)) {
          return ttl;
        }
      }
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
   * 
   * Only invalidates caches for endpoints in the allowlist.
   * User-specific endpoints like /api/orders are not cached and don't need invalidation.
   */
  private invalidateRelatedCaches(request: HttpRequest<unknown>): void {
    const url = request.url.toLowerCase();

    if (url.includes('/products') || url.includes('/categories')) {
      this.cacheService.invalidate('product:*');
      this.cacheService.invalidate('category:*');
      this.cacheService.invalidate('search:*');
    }
  }
}
