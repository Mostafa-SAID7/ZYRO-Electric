import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { map, delay, } from 'rxjs/operators';

import { StorageService } from '../../shared/services/storage.service';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
   __init() {this.storageService = inject(StorageService)}
   __init2() {this.cacheService = inject(CacheService)}
   __init3() {this.http = inject(HttpClient)}

  // State Management
   __init4() {this.cartStateSubject = new BehaviorSubject({
    items: this.loadCartFromStorage(),
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: undefined,
    total: 0,
    itemCount: 0,
    isLoading: false,
    error: null
  })}

   __init5() {this.cartState$ = this.cartStateSubject.asObservable()}
   __init6() {this.cartItems$ = this.cartState$.pipe(map((state) => state.items))}
   __init7() {this.cartTotal$ = this.cartState$.pipe(map((state) => state.total))}
   __init8() {this.cartItemCount$ = this.cartState$.pipe(map((state) => state.itemCount))}
   __init9() {this.cartSummary$ = this.cartState$.pipe(
    map((state) => this.createCartSummary(state))
  )}

  // Tax rate (default 10%)
    __init10() {this.TAX_RATE = 0.10}
    __init11() {this.SHIPPING_COST = 10}

  // Storage configuration
    __init12() {this.CART_STORAGE_KEY = 'cart_items'}
    __init13() {this.CART_SUMMARY_KEY = 'cart_summary'}
    __init14() {this.CART_CACHE_TTL = 24 * 60 * 60 * 1000} // 24 hours for persistent storage

  constructor() {;CartsService.prototype.__init.call(this);CartsService.prototype.__init2.call(this);CartsService.prototype.__init3.call(this);CartsService.prototype.__init4.call(this);CartsService.prototype.__init5.call(this);CartsService.prototype.__init6.call(this);CartsService.prototype.__init7.call(this);CartsService.prototype.__init8.call(this);CartsService.prototype.__init9.call(this);CartsService.prototype.__init10.call(this);CartsService.prototype.__init11.call(this);CartsService.prototype.__init12.call(this);CartsService.prototype.__init13.call(this);CartsService.prototype.__init14.call(this);
    this.initializeCart();
    this.setupMultiTabSync();
  }

  // ============ Cart Operations ============

  addToCart(request) {
    const state = this.cartStateSubject.value;
    const existingItem = state.items.find(item => item.productId === request.productId);

    let cartItem;

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

  removeFromCart(productId) {
    const state = this.cartStateSubject.value;
    const removedItem = state.items.find(item => item.productId === productId);
    state.items = state.items.filter(item => item.productId !== productId);
    this.updateCartState();
    return of(removedItem).pipe(delay(200));
  }

  updateCartItem(request) {
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

  clearCart() {
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
    
    // Clear from all storage locations
    this.storageService.remove(this.CART_STORAGE_KEY, 'localStorage');
    this.cacheService.remove(this.CART_SUMMARY_KEY);
    
    return of(void 0).pipe(delay(300));
  }

  getCart() {
    const state = this.cartStateSubject.value;
    const cart = {
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

  createCheckout(shippingMethod = 'standard') {
    const state = this.cartStateSubject.value;

    if (state.items.length === 0) {
      return throwError(() => new Error('Cart is empty'));
    }

    const shippingCosts = {
      standard: 10,
      express: 20,
      overnight: 50
    };

    const checkoutData = {
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

  applyCoupon(couponCode) {
    // Mock coupon logic
    const discounts = {
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

  removeCoupon() {
    const state = this.cartStateSubject.value;
    state.discount = undefined;
    this.updateCartState();
    return of(void 0).pipe(delay(200));
  }

  // ============ Server Operations ============

  createOrder(_model) {
    void _model;
    // This would call the actual API in a real application
    return of({ success: true, orderId: Math.random().toString(36).substr(2, 9) }).pipe(delay(500));
  }

  getCartSummary() {
    const state = this.cartStateSubject.value;
    return this.createCartSummary(state);
  }

  // ============ State Management ============

  getCurrentCart() {
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

  getItemCount() {
    return this.cartStateSubject.value.itemCount;
  }

  // ============ Private Methods ============

  /**
   * Initialize cart from localStorage
   */
   initializeCart() {
    const items = this.loadCartFromStorage();
    const state = this.cartStateSubject.value;
    state.items = items;
    this.updateCartState();
  }

  /**
   * Setup multi-tab synchronization via storage events
   * Synchronizes cart changes across browser tabs
   */
   setupMultiTabSync() {
    window.addEventListener('storage', (event) => {
      // Handle cart items sync from other tabs
      if (event.key === this.CART_STORAGE_KEY && event.newValue) {
        try {
          const updatedItems = JSON.parse(event.newValue) ;
          const state = this.cartStateSubject.value;
          state.items = updatedItems;
          this.updateCartState();
          console.log('Cart synchronized from other tab');
        } catch (error) {
          console.error('Error syncing cart from other tab:', error);
        }
      }

      // Handle cart summary sync
      if (event.key === this.CART_SUMMARY_KEY) {
        // Clear summary cache so it recalculates
        this.cacheService.remove(this.CART_SUMMARY_KEY);
      }
    });
  }

  /**
   * Update cart state and persist to storage
   */
   updateCartState() {
    const state = this.cartStateSubject.value;
    const items = state.items;

    // Calculate subtotal
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    // Calculate tax
    const tax = subtotal * this.TAX_RATE;

    // Calculate total
    const discount = state.discount || 0;
    const total = subtotal + tax + this.SHIPPING_COST - discount;

    // Update state
    const updatedState = {
      items,
      subtotal: Math.round(subtotal * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      shipping: this.SHIPPING_COST,
      discount: discount > 0 ? Math.round(discount * 100) / 100 : undefined,
      total: Math.round(total * 100) / 100,
      itemCount: items.length,
      isLoading: false,
      error: null
    };

    this.cartStateSubject.next(updatedState);

    // Persist to localStorage (no TTL = permanent until clear)
    this.storageService.set(this.CART_STORAGE_KEY, items, 'localStorage', 0);

    // Cache summary in memory for quick access (1 hour TTL)
    this.cacheService.set(this.CART_SUMMARY_KEY, this.createCartSummary(updatedState), 60 * 60 * 1000);
  }

  /**
   * Create cart summary from state
   */
   createCartSummary(state) {
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

  /**
   * Load cart from localStorage
   */
   loadCartFromStorage() {
    try {
      const stored = this.storageService.get(this.CART_STORAGE_KEY, 'localStorage');
      return stored || [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  /**
   * Invalidate cart cache (call on checkout completion)
   */
  invalidateCartCache() {
    this.cacheService.remove(this.CART_SUMMARY_KEY);
    this.cacheService.invalidate('cart:*');
  }

  /**
   * Get current cart without waiting for observable
   */
  getCurrentCartSync() {
    return this.cartStateSubject.value;
  }
}
