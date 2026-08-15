import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartsService } from '../carts/services/carts.service';
import { CartItem } from '../carts/models';
import { AuthService } from '../auth/services/auth.service';
import { OrderService } from '../orders/services/order.service';
import { UiToastComponent } from '../shared/ui/components/toast/toast.component';
import { UiConfirmationComponent } from '../shared/ui/components/confirmation/confirmation.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartsService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  @ViewChild('toast') toast!: UiToastComponent;
  @ViewChild('confirm') confirm!: UiConfirmationComponent;

  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  isProcessing = false;
  subtotal = 0;
  total = 0;

  constructor() {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['card', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.populateUserInfo();
  }

  loadCartItems(): void {
    this.cartService.cartState$.subscribe(state => {
      this.cartItems = state.items;
      const summary = this.cartService.getCartSummary();
      this.subtotal = summary.subtotal;
      this.total = summary.total;
    });
  }

  populateUserInfo(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.checkoutForm.patchValue({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        streetAddress: user.address
      });
    }
  }

  calculateTotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal * 1.1; // 10% tax
  }

  onSubmit(): void {
    if (!this.checkoutForm.valid) return;
    if (this.confirm && typeof this.confirm.open === 'function') {
      this.confirm.open();
    }
  }

  completeOrder(): void {
    this.isProcessing = true;
    const formValue = this.checkoutForm.value;
    const shippingAddress = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      street: formValue.streetAddress,
      city: formValue.city,
      state: formValue.state,
      zipCode: formValue.zipCode,
      country: formValue.country,
      phone: '' // TODO: Add phone field to form
    };

    const paymentMethod = {
      type: formValue.paymentMethod
    };

    const orderItems = this.cartItems.map(item => ({
      productId: item.productId,
      title: item.product?.title || 'Unknown Product',
      price: item.price,
      quantity: item.quantity,
      image: item.product?.image || '',
      discount: item.discount,
      tax: item.tax
    }));

    this.orderService.createOrder(orderItems, shippingAddress, paymentMethod).subscribe({
      next: (order) => {
        this.isProcessing = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'success';
          this.toast.title = 'Order Placed!';
          this.toast.message = `Your order #${order.id} has been confirmed`;
          this.toast.show();
        }
        
        setTimeout(() => this.router.navigate(['/orders/tracking', order.id]), 2000);
      },
      error: () => {
        this.isProcessing = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'error';
          this.toast.title = 'Order Failed';
          this.toast.message = 'Could not place order. Please try again.';
          this.toast.show();
        }
      }
    });
  }
}
