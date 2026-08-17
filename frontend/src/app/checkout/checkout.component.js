 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



import { CART_SERVICE_TOKEN, AUTH_SERVICE_TOKEN, ORDER_SERVICE_TOKEN } from '../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent  {
   __init() {this.fb = inject(FormBuilder)}
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init2() {this.cartService = inject(CART_SERVICE_TOKEN)}
   __init3() {this.authService = inject(AUTH_SERVICE_TOKEN)}
   __init4() {this.orderService = inject(ORDER_SERVICE_TOKEN)}
   __init5() {this.router = inject(Router)}

  ViewChild('toast') 
  ViewChild('confirm') 

  
  __init6() {this.cartItems = []}
  __init7() {this.isProcessing = false}
  __init8() {this.subtotal = 0}
  __init9() {this.total = 0}

  constructor() {;CheckoutComponent.prototype.__init.call(this);CheckoutComponent.prototype.__init2.call(this);CheckoutComponent.prototype.__init3.call(this);CheckoutComponent.prototype.__init4.call(this);CheckoutComponent.prototype.__init5.call(this);CheckoutComponent.prototype.__init6.call(this);CheckoutComponent.prototype.__init7.call(this);CheckoutComponent.prototype.__init8.call(this);CheckoutComponent.prototype.__init9.call(this);
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

  ngOnInit() {
    this.loadCartItems();
    this.populateUserInfo();
  }

  loadCartItems() {
    this.cartService.cartState$.subscribe(state => {
      this.cartItems = state.items;
      const summary = this.cartService.getCartSummary();
      this.subtotal = summary.subtotal;
      this.total = summary.total;
    });
  }

  populateUserInfo() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.checkoutForm.patchValue({
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        streetAddress: user.address
      });
    }
  }

  calculateTotal() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.total = this.subtotal * 1.1; // 10% tax
  }

  onSubmit() {
    if (!this.checkoutForm.valid) return;
    if (this.confirm && typeof this.confirm.open === 'function') {
      this.confirm.open();
    }
  }

  completeOrder() {
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
      title: _optionalChain([item, 'access', _ => _.product, 'optionalAccess', _2 => _2.title]) || 'Unknown Product',
      price: item.price,
      quantity: item.quantity,
      image: _optionalChain([item, 'access', _3 => _3.product, 'optionalAccess', _4 => _4.image]) || '',
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
        
        this.cartService.clearCart();
        
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
