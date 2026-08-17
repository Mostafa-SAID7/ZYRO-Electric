import { inject } from '@angular/core';

import { Router } from '@angular/router';


import { CART_SERVICE_TOKEN, PRODUCT_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  {constructor() { CartComponent.prototype.__init.call(this);CartComponent.prototype.__init2.call(this);CartComponent.prototype.__init3.call(this);CartComponent.prototype.__init4.call(this);CartComponent.prototype.__init5.call(this);CartComponent.prototype.__init6.call(this); }
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init() {this.cartService = inject(CART_SERVICE_TOKEN)}
   __init2() {this.productsService = inject(PRODUCT_SERVICE_TOKEN)}
   __init3() {this.router = inject(Router)}

  ViewChild('toast') 
  ViewChild('confirm') 

  __init4() {this.cartItems = []}
  __init5() {this.cartSummary = {
    itemCount: 0,
    uniqueProducts: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  }}
  __init6() {this.couponCode = ''}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.cartState$.subscribe(state => {
      this.cartItems = state.items;
      this.loadProductDetails(this.cartItems);
      this.cartSummary = this.cartService.getCartSummary();
    });
  }

   loadProductDetails(items) {
    items.forEach(item => {
      if (!item.product) {
        this.productsService.getProductById(item.productId).subscribe({
          next: (product) => {
            item.product = product;
          }
        });
      }
    });
  }

  increaseQuantity(item) {
    item.quantity++;
    this.updateQuantity(item);
  }

  decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  getCartSummary() {
    return this.cartSummary;
  }

  updateQuantity(item) {
    this.cartService.updateCartItem({
      productId: item.productId,
      quantity: item.quantity
    }).subscribe();
  }

  removeItem(item) {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.showToast('Item removed', 'Item has been removed from your cart', 'success');
    });
  }

  showClearConfirm() {
    this.confirm.open();
  }

  clearCart() {
    this.cartService.clearCart().subscribe(() => {
      this.showToast('Cart cleared', 'Your cart is now empty', 'info');
    });
  }

  applyCoupon() {
    if (!this.couponCode.trim()) {
      this.showToast('Invalid coupon', 'Please enter a coupon code', 'error');
      return;
    }

    this.cartService.applyCoupon(this.couponCode).subscribe({
      next: (response) => {
        this.showToast('Coupon applied', response.message, 'success');
        this.couponCode = '';
      },
      error: () => {
        this.showToast('Invalid coupon', 'This coupon code is not valid', 'error');
      }
    });
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }

  continueShopping() {
    this.router.navigate(['/products']);
  }

   showToast(title, message, type) {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}

