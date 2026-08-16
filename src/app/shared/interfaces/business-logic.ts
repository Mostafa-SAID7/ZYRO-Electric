// Liskov Substitution & Interface Segregation: Focused business logic contracts

import { Observable } from 'rxjs';
import { AddToCartRequest, UpdateCartItemRequest, CartSummary, Cart } from '../../carts/models';
import { AuthCredentials, RegisterData, User, UserProfile, AuthResponse } from '../../auth/models';
import { Product, ProductPage, ProductFilter, Category, Review } from '../../products/models';
import { Order, OrderItem, ShippingAddress, PaymentMethod, OrderPage, OrderFilter, OrderStatus } from '../../orders/models';

// ============ PRODUCT SERVICE INTERFACE ============

export interface IProductService {
  getProducts(filter?: ProductFilter, page?: number, pageSize?: number): Observable<ProductPage>;
  getProductById(id: string): Observable<Product>;
  searchProducts(query: string, page?: number, pageSize?: number): Observable<ProductPage>;
  getCategories(): Observable<Category[]>;
  getProductReviews(productId: string, page?: number, pageSize?: number): Observable<{ items: Review[]; total: number }>;
  getProductsByCategory(categoryId: string, page?: number, pageSize?: number): Observable<ProductPage>;
  getFeaturedProducts(limit?: number): Observable<Product[]>;
}

// ============ CART SERVICE INTERFACE ============

export interface ICartService {
  getCart(): Observable<Cart>;
  addToCart(request: AddToCartRequest): Observable<any>;
  removeFromCart(productId: string): Observable<any>;
  updateCartItem(request: UpdateCartItemRequest): Observable<any>;
  clearCart(): Observable<void>;
  getCartSummary(): CartSummary;
  cartState$: Observable<any>;
  cartItems$: Observable<any>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;
  applyCoupon(code: string): Observable<{ discountAmount: number; message: string }>;
  removeCoupon(): Observable<void>;
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
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  register(data: RegisterData): Observable<AuthResponse>;
  isAuthenticated(): boolean;
  getCurrentUser(): User | null;
  getUserProfile(): Observable<UserProfile>;
  updateUserProfile(profile: Partial<UserProfile>): Observable<UserProfile>;
}

// ============ ORDER SERVICE INTERFACE ============

export interface IOrderService {
  createOrder(items: OrderItem[], shippingAddress: ShippingAddress, paymentMethod: PaymentMethod): Observable<Order>;
  getOrders(page?: number, pageSize?: number, filter?: OrderFilter): Observable<OrderPage>;
  getOrderById(id: string): Observable<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus, message: string): Observable<Order>;
  cancelOrder(orderId: string, reason: string): Observable<Order>;
  returnOrder(orderId: string, reason: string): Observable<Order>;
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
