// Liskov Substitution & Interface Segregation: Focused business logic contracts

import { Observable } from 'rxjs';

// ============ PRODUCT SERVICE INTERFACE ============

export interface IProductService {
  getProducts(): Observable<any[]>;
  getProductById(id: string): Observable<any>;
  searchProducts(query: string): Observable<any[]>;
  getCategories(): Observable<any[]>;
}

// ============ CART SERVICE INTERFACE ============

export interface ICartService {
  getCart(): Observable<any>;
  addToCart(productId: string, quantity: number): void;
  removeFromCart(productId: string): void;
  clearCart(): void;
  getCartTotal(): Observable<number>;
}

// ============ CHECKOUT SERVICE INTERFACE ============

export interface ICheckoutService {
  prepareCheckout(): Observable<any>;
  applyDiscount(code: string): Observable<{ success: boolean; discount: number }>;
  processPayment(paymentDetails: any): Observable<{ success: boolean; orderId: string }>;
  confirmOrder(): Observable<any>;
}

// ============ AUTH SERVICE INTERFACES ============

export interface IAuthenticationService {
  login(email: string, password: string): Observable<void>;
  logout(): Observable<void>;
  register(email: string, password: string, name: string): Observable<void>;
  isAuthenticated(): Observable<boolean>;
}

export interface IPasswordService {
  changePassword(oldPassword: string, newPassword: string): Observable<void>;
  resetPassword(email: string): Observable<void>;
  validatePasswordStrength(password: string): { score: number; feedback: string[] };
}

export interface ITwoFactorService {
  enableTwoFactor(): Observable<{ secret: string; qrCode: string }>;
  verifyTwoFactor(code: string): Observable<boolean>;
  disableTwoFactor(): Observable<void>;
}

// ============ ORDER SERVICE INTERFACE ============

export interface IOrderService {
  createOrder(orderData: any): Observable<any>;
  getOrders(): Observable<any[]>;
  getOrderById(id: string): Observable<any>;
  cancelOrder(id: string): Observable<void>;
  updateOrderStatus(id: string, status: string): Observable<void>;
}

// ============ NOTIFICATION SERVICE INTERFACE ============

export interface INotificationService {
  showSuccess(title: string, message: string): void;
  showError(title: string, message: string): void;
  showInfo(title: string, message: string): void;
  showWarning(title: string, message: string): void;
}

// ============ CALCULATION SERVICE INTERFACE ============

export interface ICalculationService {
  calculateTax(subtotal: number): number;
  calculateShipping(method: string): number;
  calculateDiscount(subtotal: number, percent: number): number;
  calculateTotal(subtotal: number, tax: number, shipping: number, discount: number): number;
}

// ============ FILTER & SORT SERVICE INTERFACE ============

export interface IFilterService {
  filter(items: any[], filters: any): any[];
}

export interface ISortService {
  sort(items: any[], sortBy: string): any[];
}

// ============ REVIEW SERVICE INTERFACE ============

export interface IReviewService {
  getReviews(productId: string): Observable<any[]>;
  getAverageRating(productId: string): Observable<number>;
  addReview(review: any): Observable<void>;
  deleteReview(reviewId: string): Observable<void>;
}
