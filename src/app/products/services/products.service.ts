import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, delay, map } from 'rxjs/operators';
import {
  Product,
  ProductPage,
  ProductFilter,
  Category,
  Review,
  ProductRating
} from '../models';
import { MOCK_PRODUCTS } from '../data/mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
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

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  // ============ Product Operations ============

  getProducts(filter?: ProductFilter, page: number = 1, pageSize: number = 12): Observable<ProductPage> {
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

  searchProducts(query: string, page: number = 1, pageSize: number = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      searchQuery: query
    };

    return this.getProducts(filter, page, pageSize);
  }

  getProductsByCategory(categoryId: string, page: number = 1, pageSize: number = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      categories: [categoryId]
    };

    return this.getProducts(filter, page, pageSize);
  }

  getFeaturedProducts(limit: number = 8): Observable<Product[]> {
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

  getProductReviews(productId: string, page: number = 1, pageSize: number = 5): Observable<{ items: Review[]; total: number }> {
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

  filterByPriceRange(min: number, max: number, page: number = 1, pageSize: number = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      minPrice: min,
      maxPrice: max
    };

    return this.getProducts(filter, page, pageSize);
  }

  filterByRating(minRating: number, page: number = 1, pageSize: number = 12): Observable<ProductPage> {
    const filter: ProductFilter = {
      rating: minRating
    };

    return this.getProducts(filter, page, pageSize);
  }

  getInStockProducts(page: number = 1, pageSize: number = 12): Observable<ProductPage> {
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

  private filterProducts(filter?: ProductFilter, page: number = 1, pageSize: number = 12): ProductPage {
    let results = [...this.mockProducts];

    if (filter) {
      // Filter by search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        results = results.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        );
      }

      // Filter by categories
      if (filter.categories && filter.categories.length > 0) {
        results = results.filter(p => filter.categories!.includes(p.category));
      }

      // Filter by price range
      if (filter.minPrice !== undefined) {
        results = results.filter(p => p.price >= filter.minPrice!);
      }
      if (filter.maxPrice !== undefined) {
        results = results.filter(p => p.price <= filter.maxPrice!);
      }

      // Filter by rating
      if (filter.rating !== undefined) {
        results = results.filter(p => p.rating.average >= filter.rating!);
      }

      // Filter by stock
      if (filter.inStock) {
        results = results.filter(p => p.stock > 0);
      }

      // Sort
      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'price-asc':
            results.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            results.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            results.sort((a, b) => b.rating.average - a.rating.average);
            break;
          case 'newest':
            results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
          case 'popularity':
            results.sort((a, b) => b.rating.count - a.rating.count);
            break;
        }
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
    return MOCK_PRODUCTS;
  }

  private generateMockCategories(): Category[] {
    return [
      {
        id: 'cat-1',
        name: 'Electronics',
        description: 'Latest gadgets, smartphones, keyboards, monitors and audio equipment',
        productCount: 8
      },
      {
        id: 'cat-2',
        name: 'Fashion',
        description: 'Trendy clothing, accessories, shoes and watches',
        productCount: 5
      },
      {
        id: 'cat-3',
        name: 'Books',
        description: 'Wide selection of books and learning materials',
        productCount: 4
      },
      {
        id: 'cat-4',
        name: 'Home',
        description: 'Home improvement, furniture, and living essentials',
        productCount: 6
      },
      {
        id: 'cat-5',
        name: 'Sports',
        description: 'Sports equipment and fitness gear',
        productCount: 12
      }
    ];
  }
}
