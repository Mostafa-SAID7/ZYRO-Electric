import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartsService } from '../carts/services/carts.service';
import { AuthService } from '../auth/services/auth.service';
import { OrderService } from '../orders/services/order.service';
import { UiToastComponent } from '../shared/ui/components/toast/toast.component';
import { UiConfirmationComponent } from '../shared/ui/components/confirmation/confirmation.component';

@Component({
  selector: 'app-checkout',
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <!-- Header -->
      <div class="bg-card border-b border-border p-4">
        <div class="max-w-6xl mx-auto">
          <h1 class="text-2xl font-bold gradient-text">Checkout</h1>
        </div>
      </div>

      <div class="max-w-6xl mx-auto p-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Form Section -->
          <div class="lg:col-span-2">
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <!-- Shipping Address -->
              <app-ui-card padding="lg">
                <h2 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                  <lucide-icon name="map-pin" class="w-5 h-5"></lucide-icon>
                  Shipping Address
                </h2>
                
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="section-label">First Name</label>
                      <input
                        type="text"
                        formControlName="firstName"
                        class="form-input w-full mt-2">
                    </div>
                    <div>
                      <label class="section-label">Last Name</label>
                      <input
                        type="text"
                        formControlName="lastName"
                        class="form-input w-full mt-2">
                    </div>
                  </div>

                  <div>
                    <label class="section-label">Street Address</label>
                    <input
                      type="text"
                      formControlName="streetAddress"
                      class="form-input w-full mt-2">
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="section-label">City</label>
                      <input
                        type="text"
                        formControlName="city"
                        class="form-input w-full mt-2">
                    </div>
                    <div>
                      <label class="section-label">State</label>
                      <input
                        type="text"
                        formControlName="state"
                        class="form-input w-full mt-2">
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="section-label">ZIP Code</label>
                      <input
                        type="text"
                        formControlName="zipCode"
                        class="form-input w-full mt-2">
                    </div>
                    <div>
                      <label class="section-label">Country</label>
                      <input
                        type="text"
                        formControlName="country"
                        class="form-input w-full mt-2">
                    </div>
                  </div>
                </div>
              </app-ui-card>

              <!-- Payment Method -->
              <app-ui-card padding="lg">
                <h2 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                  <lucide-icon name="credit-card" class="w-5 h-5"></lucide-icon>
                  Payment Method
                </h2>
                
                <div class="space-y-3">
                  <label class="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="card"
                      class="w-4 h-4">
                    <span class="flex-1 font-semibold">Credit Card</span>
                    <lucide-icon name="credit-card" class="w-5 h-5 text-accent"></lucide-icon>
                  </label>
                  
                  <label class="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="paypal"
                      class="w-4 h-4">
                    <span class="flex-1 font-semibold">PayPal</span>
                    <lucide-icon name="globe" class="w-5 h-5 text-accent"></lucide-icon>
                  </label>

                  <label class="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      formControlName="paymentMethod"
                      value="apple"
                      class="w-4 h-4">
                    <span class="flex-1 font-semibold">Apple Pay</span>
                    <lucide-icon name="smartphone" class="w-5 h-5 text-accent"></lucide-icon>
                  </label>
                </div>
              </app-ui-card>

              <!-- Order Summary -->
              <button
                type="submit"
                [disabled]="!checkoutForm.valid || isProcessing"
                class="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2">
                <lucide-icon *ngIf="!isProcessing" name="check-circle" class="w-5 h-5"></lucide-icon>
                <span *ngIf="isProcessing">Processing...</span>
                <span *ngIf="!isProcessing">Complete Order</span>
              </button>
            </form>
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <app-ui-card padding="lg" variant="glass">
              <h3 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
                <lucide-icon name="shopping-bag" class="w-5 h-5"></lucide-icon>
                Order Summary
              </h3>

              <!-- Items -->
              <div class="space-y-3 mb-4 max-h-96 overflow-y-auto custom-scrollbar">
                <div
                  *ngFor="let item of cartItems"
                  class="flex justify-between items-start gap-2 pb-3 border-b border-border">
                  <div>
                    <p class="font-semibold text-sm">{{ item.title }}</p>
                    <p class="text-xs text-muted-foreground">Qty: {{ item.quantity }}</p>
                  </div>
                  <p class="font-semibold whitespace-nowrap">{{ item.price * item.quantity | number:'1.2-2' }} L.E</p>
                </div>
              </div>

              <!-- Summary -->
              <div class="space-y-2 pt-4 border-t border-border">
                <div class="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{{ subtotal | number:'1.2-2' }} L.E</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span class="text-accent">Free</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>{{ subtotal * 0.1 | number:'1.2-2' }} L.E</span>
                </div>
                <div class="flex justify-between text-lg font-bold text-accent pt-2 border-t border-border">
                  <span>Total:</span>
                  <span>{{ total | number:'1.2-2' }} L.E</span>
                </div>
              </div>
            </app-ui-card>
          </div>
        </div>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <app-ui-confirmation #confirm
      title="Confirm Order"
      message="Please review your order details before confirming."
      confirmLabel="Place Order"
      type="default"
      (confirmed)="completeOrder()">
    </app-ui-confirmation>

    <!-- Toast -->
    <app-ui-toast #toast></app-ui-toast>
  `,
  styles: []
})
export class CheckoutComponent implements OnInit {
  @ViewChild('toast') toast!: UiToastComponent;
  @ViewChild('confirm') confirm!: UiConfirmationComponent;

  checkoutForm: FormGroup;
  cartItems: any[] = [];
  isProcessing = false;
  subtotal = 0;
  total = 0;

  constructor(
    private fb: FormBuilder,
    private cartService: any,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {
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
    // TODO: Get from cart service
    this.cartItems = [];
    this.calculateTotal();
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
    this.confirm.open();
  }

  completeOrder(): void {
    this.isProcessing = true;
    const shippingAddress = `${this.checkoutForm.value.streetAddress}, ${this.checkoutForm.value.city}, ${this.checkoutForm.value.state} ${this.checkoutForm.value.zipCode}, ${this.checkoutForm.value.country}`;

    this.orderService.createOrder(this.cartItems, shippingAddress).subscribe({
      next: (order) => {
        this.isProcessing = false;
        this.toast.type = 'success';
        this.toast.title = 'Order Placed!';
        this.toast.message = `Your order #${order.id} has been confirmed`;
        this.toast.show();
        
        setTimeout(() => this.router.navigate(['/orders/tracking', order.id]), 2000);
      },
      error: (err) => {
        this.isProcessing = false;
        this.toast.type = 'error';
        this.toast.title = 'Order Failed';
        this.toast.message = 'Could not place order. Please try again.';
        this.toast.show();
      }
    });
  }
}
