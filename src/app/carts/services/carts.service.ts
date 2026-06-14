import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, delay } from 'rxjs/operators';
import { Cart, CartItem, CartState, CartSummary, AddToCartRequest, UpdateCartItemRequest, CheckoutData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  // State Management
  private cartStateSubject = new BehaviorSubject<CartState>({
    items: this.loadCartFromStorage(),
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: undefined,
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null
  });

  public cartState$ = this.cartStateSubject.asObservable();
  public cartItems$ = this.cartState$.pipe(map((state: CartState) => state.items));
  public cartTotal$ = this.cartState$.pipe(map((state: CartState) => state.total));
  public cartItemCount$ = this.cartState$.pipe(map((state: CartState) => state.itemCount));
  public cartSummary$ = this.cartState$.pipe(
    map((state: CartState) => this.createCartSummary(state))
  );

  // Tax rate (default 10%)
  private readonly TAX_RATE = 0.10;
  private readonly SHIPPING_COST = 10;

  constructor(private http: HttpClient) {
    this.initializeCart();
  }

  // ============ Cart Operations ============

  addToCart(request: AddToCartRequest): Observable<CartItem> {
    const state = this.cartStateSubject.value;
    const existingItem = state.items.find(item => item.productId === request.productId);

    let cartItem: CartItem;

    if (existingItem) {
      existingItem.quantity += request.quantity;
      cartItem = existingItem;
    } else {
      cartItem = {
        productId: request.productId,
        quantity: request.quantity,
        price: 0, // Should come from product service in real app
        addedAt: new Date()
      };
      state.items.push(cartItem);
    }

    this.updateCartState();
    return of(cartItem).pipe(delay(200));
  }

  removeFromCart(productId: string): Observable<CartItem | void> {
    const state = this.cartStateSubject.value;
    const removedItem = state.items.find(item => item.productId === productId);
    state.items = state.items.filter(item => item.productId !== productId);
    this.updateCartState();
    return of(removedItem).pipe(delay(200));
  }

  updateCartItem(request: UpdateCartItemRequest): Observable<CartItem> {
    const state = this.cartStateSubject.value;
    const item = state.items.find(i => i.productId === request.productId);

    if (!item) {
      return throwError(() => new Error('Item not found in cart'));
    }

    if (request.quantity <= 0) {
      const removedItem = item;
      state.items = state.items.filter(i => i.productId !== request.productId);
      this.updateCartState();
      return of(removedItem).pipe(delay(200));
    }

    item.quantity = request.quantity;
    this.updateCartState();
    return of(item).pipe(delay(200));
  }

  clearCart(): Observable<void> {
    this.cartStateSubject.next({
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: undefined,
      total: 0,
      itemCount: 0,
      isLoading: false,
      error: null
    });
    localStorage.removeItem('cart');
    return of(void 0).pipe(delay(300));
  }

  getCart(): Observable<Cart> {
    const state = this.cartStateSubject.value;
    const cart: Cart = {
      items: state.items,
      subtotal: state.subtotal,
      tax: state.tax,
      shipping: state.shipping,
      discount: state.discount,
      total: state.total,
      lastUpdated: new Date()
    };
    return of(cart).pipe(delay(200));
  }

  // ============ Checkout ============

  createCheckout(shippingMethod: 'standard' | 'express' | 'overnight' = 'standard'): Observable<CheckoutData> {
    const state = this.cartStateSubject.value;

    if (state.items.length === 0) {
      return throwError(() => new Error('Cart is empty'));
    }

    const shippingCosts = {
      standard: 10,
      express: 20,
      overnight: 50
    };

    const checkoutData: CheckoutData = {
      cartItems: state.items,
      shippingMethod,
      shippingCost: shippingCosts[shippingMethod],
      taxAmount: state.tax,
      couponCode: undefined,
      discountAmount: state.discount,
      total: state.total
    };

    return of(checkoutData).pipe(delay(300));
  }

  applyCoupon(couponCode: string): Observable<{ discountAmount: number; message: string }> {
    // Mock coupon logic
    const discounts: Record<string, number> = {
      'SAVE10': 0.10,
      'SAVE20': 0.20,
      'FREESHIP': this.SHIPPING_COST / 100
    };

    const discountPercent = discounts[couponCode];
    if (!discountPercent) {
      return throwError(() => new Error('Invalid coupon code'));
    }

    const state = this.cartStateSubject.value;
    const discountAmount = state.subtotal * discountPercent;

    state.discount = discountAmount;
    this.updateCartState();

    return of({
      discountAmount,
      message: `Coupon applied! You saved $${discountAmount.toFixed(2)}`
    }).pipe(delay(300));
  }

  removeCoupon(): Observable<void> {
    const state = this.cartStateSubject.value;
    state.discount = undefined;
    this.updateCartState();
    return of(void 0).pipe(delay(200));
  }

  // ============ Server Operations ============

  createOrder(model: any): Observable<any> {
    // This would call the actual API in a real application
    return of({ success: true, orderId: Math.random().toString(36).substr(2, 9) }).pipe(delay(500));
  }

  getCartSummary(): CartSummary {
    const state = this.cartStateSubject.value;
    return this.createCartSummary(state);
  }

  // ============ State Management ============

  getCurrentCart(): Cart {
    const state = this.cartStateSubject.value;
    return {
      items: state.items,
      subtotal: state.subtotal,
      tax: state.tax,
      shipping: state.shipping,
      discount: state.discount,
      total: state.total,
      lastUpdated: new Date()
    };
  }

  getItemCount(): number {
    return this.cartStateSubject.value.itemCount;
  }

  // ============ Private Methods ============

  private initializeCart(): void {
    const items = this.loadCartFromStorage();
    const state = this.cartStateSubject.value;
    state.items = items;
    this.updateCartState();
  }

  private updateCartState(): void {
    const state = this.cartStateSubject.value;
    const items = state.items;

    // Calculate subtotal
    let subtotal = 0;
    items.forEach((item: CartItem) => {
      subtotal += item.price * item.quantity;
    });

    // Calculate tax
    const tax = subtotal * this.TAX_RATE;

    // Calculate total
    const discount = state.discount || 0;
    const total = subtotal + tax + this.SHIPPING_COST - discount;

    // Update state
    this.cartStateSubject.next({
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: this.SHIPPING_COST,
      discount: discount > 0 ? Math.round(discount * 100) / 100 : undefined,
      total: Math.round(total * 100) / 100,
      itemCount: items.length,
      isLoading: false,
      error: null
    });

    this.saveCartToStorage(items);
  }

  private createCartSummary(state: CartState): CartSummary {
    const uniqueProducts = new Set(state.items.map(item => item.productId)).size;
    return {
      itemCount: state.itemCount,
      uniqueProducts,
      subtotal: state.subtotal,
      tax: state.tax,
      shipping: state.shipping,
      discount: state.discount,
      total: state.total
    };
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}
