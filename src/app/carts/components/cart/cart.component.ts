import { Component, OnInit, ViewChild } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { CartItem, CartSummary } from '../../models';
import { Router } from '@angular/router';
import { UiToastComponent } from '../../../shared/ui/components/toast/toast.component';
import { UiConfirmationComponent } from '../../../shared/ui/components/confirmation/confirmation.component';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('toast') toast!: UiToastComponent;
  @ViewChild('confirm') confirm!: UiConfirmationComponent;

  cartItems: CartItem[] = [];
  cartSummary: CartSummary = {
    itemCount: 0,
    uniqueProducts: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  };
  couponCode = '';

  constructor(
    private cartService: CartsService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.cartState$.subscribe(state => {
      this.cartItems = state.items;
      this.loadProductDetails(this.cartItems);
      this.cartSummary = this.cartService.getCartSummary();
    });
  }

  private loadProductDetails(items: CartItem[]): void {
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

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateQuantity(item);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  getCartSummary() {
    return this.cartSummary;
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateCartItem({
      productId: item.productId,
      quantity: item.quantity
    }).subscribe();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item.productId).subscribe(() => {
      this.showToast('Item removed', 'Item has been removed from your cart', 'success');
    });
  }

  showClearConfirm(): void {
    this.confirm.open();
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => {
      this.showToast('Cart cleared', 'Your cart is now empty', 'info');
    });
  }

  applyCoupon(): void {
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

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  private showToast(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}

