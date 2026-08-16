import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';
import {
  Product,
  ProductPage,
  ProductFilter,
  Category,
  Review
} from '../models';
import { MOCK_PRODUCTS_NICHES } from '../data/mock-products-niches';
import { SortStrategyService } from '../../shared/services/sort-strategy.service';
import { FilterStrategyService } from '../../shared/services/filter-strategy.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private sortStrategy = inject(SortStrategyService);
  private filterStrategy = inject(FilterStrategyService);

  private mockProducts: Product[] = this.generateMockProducts();
  private mockCategories: Category[] = this.generateMockCategories();

  // State Management
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>(this.mockCategories);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public products$ = this.productsSubject.asObservable();
  public categories$ = this.categoriesSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor() {
    this.loadProducts();
  }

  // ============ Product Operations ============

  getProducts(filter?: ProductFilter, page = 1, pageSize = 12): Observable<ProductPage> {
    this.setLoading(true);

    return of(this.filterProducts(filter, page, pageSize)).pipe(
      delay(300),
      tap(() => this.setLoading(false)),
      catchError((error) => {
        this.setError('Failed to load products');
        return throwError(() => error);
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    const product = this.mockProducts.find(p => p.id === id);

    if (!product) {
      return throwError(() => new Error('Product not found'));
    }

    return of(product).pipe(delay(200));
  }

  searchProducts(query: string, page = 1, pageSize = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      searchQuery: query
    };

    return this.getProducts(filter, page, pageSize);
  }

  getProductsByCategory(categoryId: string, page = 1, pageSize = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      categories: [categoryId]
    };

    return this.getProducts(filter, page, pageSize);
  }

  getFeaturedProducts(limit = 8): Observable<Product[]> {
    const featured = this.mockProducts
      .filter(p => p.isFeatured && p.isActive)
      .slice(0, limit);

    return of(featured).pipe(delay(200));
  }

  // ============ Category Operations ============

  getCategories(): Observable<Category[]> {
    return of(this.mockCategories).pipe(delay(100));
  }

  getCategoryById(id: string): Observable<Category> {
    const category = this.mockCategories.find(c => c.id === id);

    if (!category) {
      return throwError(() => new Error('Category not found'));
    }

    return of(category).pipe(delay(100));
  }

  // ============ Review Operations ============

  getProductReviews(productId: string, page = 1, pageSize = 5): Observable<{ items: Review[]; total: number }> {
    // Mock reviews
    const mockReviews: Review[] = [
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

  addReview(productId: string, review: Omit<Review, 'id' | 'productId' | 'createdAt' | 'updatedAt' | 'helpful'>): Observable<Review> {
    const newReview: Review = {
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

  filterByPriceRange(min: number, max: number, page = 1, pageSize = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      minPrice: min,
      maxPrice: max
    };

    return this.getProducts(filter, page, pageSize);
  }

  filterByRating(minRating: number, page = 1, pageSize = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      rating: minRating
    };

    return this.getProducts(filter, page, pageSize);
  }

  getInStockProducts(page = 1, pageSize = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      inStock: true
    };

    return this.getProducts(filter, page, pageSize);
  }

  // ============ State Management ============

  private loadProducts(): void {
    this.setLoading(true);
    this.productsSubject.next(this.mockProducts);
    this.setLoading(false);
  }

  private filterProducts(filter?: ProductFilter, page = 1, pageSize = 12): ProductPage {
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

  private setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }

  private setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  // ============ Mock Data Generators ============

  private generateMockProducts(): Product[] {
    return MOCK_PRODUCTS_NICHES;
  }

  private generateMockCategories(): Category[] {
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
