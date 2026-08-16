import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, throwError, shareReplay } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';







import { MOCK_PRODUCTS_NICHES } from '../data/mock-products-niches';
import { SORT_STRATEGY_TOKEN, FILTER_STRATEGY_TOKEN } from '../../shared/interfaces/dependency-injection';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   __init() {this.http = inject(HttpClient)}
   __init2() {this.cacheService = inject(CacheService)}
  
  // DIP: Depend on abstractions (ISortStrategy, IFilterStrategy) via injection tokens, not concrete classes
   __init3() {this.sortStrategy = inject(SORT_STRATEGY_TOKEN)}
   __init4() {this.filterStrategy = inject(FILTER_STRATEGY_TOKEN)}

   __init5() {this.mockProducts = this.generateMockProducts()}
   __init6() {this.mockCategories = this.generateMockCategories()}

  // State Management
   __init7() {this.productsSubject = new BehaviorSubject([])}
   __init8() {this.categoriesSubject = new BehaviorSubject(this.mockCategories)}
   __init9() {this.isLoadingSubject = new BehaviorSubject(false)}
   __init10() {this.errorSubject = new BehaviorSubject(null)}

   __init11() {this.products$ = this.productsSubject.asObservable()}
   __init12() {this.categories$ = this.categoriesSubject.asObservable().pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  )}
   __init13() {this.isLoading$ = this.isLoadingSubject.asObservable()}
   __init14() {this.error$ = this.errorSubject.asObservable()}

  // Cache keys for invalidation
    __init15() {this.PRODUCT_CACHE_TTL = 60 * 60 * 1000} // 1 hour
    __init16() {this.CATEGORY_CACHE_TTL = 24 * 60 * 60 * 1000} // 24 hours
    __init17() {this.SEARCH_CACHE_TTL = 30 * 60 * 1000} // 30 minutes

  constructor() {;ProductsService.prototype.__init.call(this);ProductsService.prototype.__init2.call(this);ProductsService.prototype.__init3.call(this);ProductsService.prototype.__init4.call(this);ProductsService.prototype.__init5.call(this);ProductsService.prototype.__init6.call(this);ProductsService.prototype.__init7.call(this);ProductsService.prototype.__init8.call(this);ProductsService.prototype.__init9.call(this);ProductsService.prototype.__init10.call(this);ProductsService.prototype.__init11.call(this);ProductsService.prototype.__init12.call(this);ProductsService.prototype.__init13.call(this);ProductsService.prototype.__init14.call(this);ProductsService.prototype.__init15.call(this);ProductsService.prototype.__init16.call(this);ProductsService.prototype.__init17.call(this);
    this.loadProducts();
  }

  // ============ Product Operations ============

  getProducts(filter, page = 1, pageSize = 12) {
    // Generate cache key from filter
    const cacheKey = this.generateCacheKey('products', { filter, page, pageSize });
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      this.setLoading(false);
      return of(cached);
    }

    this.setLoading(true);

    return of(this.filterProducts(filter, page, pageSize)).pipe(
      delay(300),
      tap(result => {
        // Cache the result
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
        this.setLoading(false);
      }),
      catchError((error) => {
        this.setError('Failed to load products');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  getProductById(id) {
    const cacheKey = `product:${id}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const product = this.mockProducts.find(p => p.id === id);

    if (!product) {
      return throwError(() => new Error('Product not found'));
    }

    return of(product).pipe(
      delay(200),
      tap(result => {
        // Cache individual product
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  searchProducts(query, page = 1, pageSize = 12) {
    const cacheKey = `search:${query}:${page}:${pageSize}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const filter = {
      searchQuery: query
    };

    return this.getProducts(filter, page, pageSize).pipe(
      tap(result => {
        // Cache search results separately
        this.cacheService.set(cacheKey, result, this.SEARCH_CACHE_TTL);
      })
    );
  }

  getProductsByCategory(categoryId, page = 1, pageSize = 12) {
    const cacheKey = `category:${categoryId}:${page}:${pageSize}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const filter = {
      categories: [categoryId]
    };

    return this.getProducts(filter, page, pageSize).pipe(
      tap(result => {
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  getFeaturedProducts(limit = 8) {
    const cacheKey = `featured:${limit}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const featured = this.mockProducts
      .filter(p => p.isFeatured && p.isActive)
      .slice(0, limit);

    return of(featured).pipe(
      delay(200),
      tap(result => {
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  // ============ Category Operations ============

  getCategories() {
    const cacheKey = 'categories:all';
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    return of(this.mockCategories).pipe(
      delay(100),
      tap(result => {
        this.cacheService.set(cacheKey, result, this.CATEGORY_CACHE_TTL);
      })
    );
  }

  getCategoryById(id) {
    const cacheKey = `category:${id}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const category = this.mockCategories.find(c => c.id === id);

    if (!category) {
      return throwError(() => new Error('Category not found'));
    }

    return of(category).pipe(
      delay(100),
      tap(result => {
        this.cacheService.set(cacheKey, result, this.CATEGORY_CACHE_TTL);
      })
    );
  }

  // ============ Review Operations ============

  getProductReviews(productId, page = 1, pageSize = 5) {
    // Mock reviews
    const mockReviews = [
      {
        id: '1',
        productId,
        userId: 'user1',
        userName: 'John Doe',
        rating: 5,
        title: 'Excellent product!',
        comment: 'Great quality and fast shipping.',
        helpful: 42,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        productId,
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 4,
        title: 'Good value for money',
        comment: 'Product is as described. Recommended.',
        helpful: 28,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
      }
    ];

    const total = mockReviews.length;
    const items = mockReviews.slice((page - 1) * pageSize, page * pageSize);

    return of({ items, total }).pipe(delay(300));
  }

  addReview(productId, review) {
    const newReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      productId,
      helpful: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newReview).pipe(delay(500));
  }

  // ============ Filtering & Sorting ============

  filterByPriceRange(min, max, page = 1, pageSize = 12) {
    const cacheKey = `price:${min}-${max}:${page}:${pageSize}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const filter = {
      minPrice: min,
      maxPrice: max
    };

    return this.getProducts(filter, page, pageSize).pipe(
      tap(result => {
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  filterByRating(minRating, page = 1, pageSize = 12) {
    const cacheKey = `rating:${minRating}:${page}:${pageSize}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const filter = {
      rating: minRating
    };

    return this.getProducts(filter, page, pageSize).pipe(
      tap(result => {
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  getInStockProducts(page = 1, pageSize = 12) {
    const cacheKey = `instock:${page}:${pageSize}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const filter = {
      inStock: true
    };

    return this.getProducts(filter, page, pageSize).pipe(
      tap(result => {
        this.cacheService.set(cacheKey, result, this.PRODUCT_CACHE_TTL);
      })
    );
  }

  /**
   * Invalidate product caches (call on order completion, inventory update, etc.)
   */
  invalidateProductCache(pattern = 'product:*') {
    this.cacheService.invalidate(pattern);
  }

  /**
   * Invalidate all caches (call on logout, user preference change)
   */
  clearAllCaches() {
    this.cacheService.invalidate('product:*');
    this.cacheService.invalidate('search:*');
    this.cacheService.invalidate('category:*');
    this.cacheService.invalidate('featured:*');
    this.cacheService.invalidate('price:*');
    this.cacheService.invalidate('rating:*');
    this.cacheService.invalidate('instock:*');
  }

  /**
   * Generate cache key from filter criteria
   */
   generateCacheKey(prefix, data) {
    if (!data) return prefix;
    try {
      const hash = JSON.stringify(data)
        .split('')
        .reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)
        .toString(36);
      return `${prefix}:${hash}`;
    } catch (e) {
      return prefix;
    }
  }

  // ============ State Management ============

   loadProducts() {
    this.setLoading(true);
    this.productsSubject.next(this.mockProducts);
    this.setLoading(false);
  }

   filterProducts(filter, page = 1, pageSize = 12) {
    let results = [...this.mockProducts];

    if (filter) {
      // Use FilterStrategyService to follow OCP (Open-Closed Principle)
      // New filter strategies can be added without modifying this code
      results = this.filterStrategy.filter(results, filter);
      
      // Use SortStrategyService to follow OCP (Open-Closed Principle)
      // New sort strategies can be added without modifying this code
      if (filter.sortBy) {
        results = this.sortStrategy.sort(results, filter.sortBy);
      }
    }

    const total = results.length;
    const totalPages = Math.ceil(total / pageSize);
    const items = results.slice((page - 1) * pageSize, page * pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages
    };
  }

   setLoading(isLoading) {
    this.isLoadingSubject.next(isLoading);
  }

   setError(error) {
    this.errorSubject.next(error);
  }

  // ============ Mock Data Generators ============

   generateMockProducts() {
    return MOCK_PRODUCTS_NICHES;
  }

   generateMockCategories() {
    return [
      {
        id: 'smartphone-accessories',
        name: 'Smartphone Accessories',
        description: 'Phone cases, screen protectors, and mobile device accessories',
        productCount: 5
      },
      {
        id: 'laptop-accessories',
        name: 'Laptop Accessories',
        description: 'Laptop stands, cooling pads, docking stations and more',
        productCount: 5
      },
      {
        id: 'cable-management',
        name: 'Cable Management',
        description: 'Cable organizers, clips, and wire management solutions',
        productCount: 5
      },
      {
        id: 'desk-tech',
        name: 'Desk Tech',
        description: 'Keyboards, monitors, lamps, mice and desk accessories',
        productCount: 5
      },
      {
        id: 'smart-device-accessories',
        name: 'Smart Device Accessories',
        description: 'Smart speakers, hubs, plugs and IoT device accessories',
        productCount: 5
      },
      {
        id: 'charging-accessories',
        name: 'Charging Accessories',
        description: 'Chargers, power banks, and charging solutions',
        productCount: 5
      },
      {
        id: 'photography-accessories',
        name: 'Photography Accessories',
        description: 'Tripods, lighting, filters and photography equipment',
        productCount: 5
      },
      {
        id: 'content-creator-equipment',
        name: 'Content Creator Equipment',
        description: 'Microphones, webcams, screens and streaming equipment',
        productCount: 5
      },
      {
        id: 'electronics-organization',
        name: 'Electronics Organization',
        description: 'Storage boxes, trays, holders and organization solutions',
        productCount: 5
      }
    ];
  }
}
