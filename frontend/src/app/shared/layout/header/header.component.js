 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';




import { CART_SERVICE_TOKEN, AUTH_SERVICE_TOKEN, PRODUCT_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {constructor() { HeaderComponent.prototype.__init.call(this);HeaderComponent.prototype.__init2.call(this);HeaderComponent.prototype.__init3.call(this);HeaderComponent.prototype.__init4.call(this);HeaderComponent.prototype.__init5.call(this);HeaderComponent.prototype.__init6.call(this);HeaderComponent.prototype.__init7.call(this);HeaderComponent.prototype.__init8.call(this);HeaderComponent.prototype.__init9.call(this);HeaderComponent.prototype.__init10.call(this);HeaderComponent.prototype.__init11.call(this);HeaderComponent.prototype.__init12.call(this);HeaderComponent.prototype.__init13.call(this);HeaderComponent.prototype.__init14.call(this);HeaderComponent.prototype.__init15.call(this);HeaderComponent.prototype.__init16.call(this);HeaderComponent.prototype.__init17.call(this); }
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init() {this.cartsService = inject(CART_SERVICE_TOKEN)}
   __init2() {this.authService = inject(AUTH_SERVICE_TOKEN)}
   __init3() {this.productsService = inject(PRODUCT_SERVICE_TOKEN)}
   __init4() {this.router = inject(Router)}
   __init5() {this.renderer = inject(Renderer2)}
   __init6() {this.fb = inject(FormBuilder)}

  ViewChild('toast') 

  __init7() {this.isCartDrawerOpen = false}
  __init8() {this.cartItemCount = 0}
  __init9() {this.cartItems = []}
  __init10() {this.cartTotal = 0}
  __init11() {this.isLoggedIn = false}
  __init12() {this.userName = ''}
  __init13() {this.userEmail = ''}

  // Theme state
  __init14() {this.isDarkMode = true}

  // Auth Modal state
  __init15() {this.isAuthModalOpen = false}
  __init16() {this.authModalMode = 'login'}
  __init17() {this.isAuthLoading = false}
  
  

  ngOnInit() {
    // Initialize Forms
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });

    // Subscribe to cart item count
    this.cartsService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // Subscribe to cart items and product details
    this.cartsService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.loadProductDetails(items);
    });

    // Subscribe to cart total
    this.cartsService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });

    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.userName = _optionalChain([user, 'optionalAccess', _ => _.name]) || '';
    this.userEmail = _optionalChain([user, 'optionalAccess', _2 => _2.email]) || '';

    // Subscribe to auth state changes to update header when user logs in/out
    this.authService.authState$.subscribe(state => {
      this.isLoggedIn = state.isAuthenticated;
      this.userName = _optionalChain([state, 'access', _3 => _3.user, 'optionalAccess', _4 => _4.name]) || '';
      this.userEmail = _optionalChain([state, 'access', _5 => _5.user, 'optionalAccess', _6 => _6.email]) || '';
    });
  }

   passwordMatchValidator(g) {
    const password = _optionalChain([g, 'access', _7 => _7.get, 'call', _8 => _8('password'), 'optionalAccess', _9 => _9.value]);
    const confirmPassword = _optionalChain([g, 'access', _10 => _10.get, 'call', _11 => _11('confirmPassword'), 'optionalAccess', _12 => _12.value]);
    return password === confirmPassword ? null : { passwordMismatch: true };
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

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.removeClass(document.body, 'light');
    } else {
      this.renderer.addClass(document.body, 'light');
    }
  }

  toggleAuthModal(mode = 'login') {
    if (this.isLoggedIn) return;
    this.authModalMode = mode;
    this.isAuthModalOpen = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  closeAuthModal() {
    this.isAuthModalOpen = false;
    this.loginForm.reset();
    this.registerForm.reset();
    if (!this.isCartDrawerOpen) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  switchAuthMode(mode) {
    this.authModalMode = mode;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLoginSubmit() {
    if (!this.loginForm.valid) return;
    this.isAuthLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.handleAuthSuccess('Logged in successfully');
      },
      error: (err) => {
        this.isAuthLoading = false;
        this.showToast('error', 'Login Failed', err || 'An error occurred');
      }
    });
  }

  onRegisterSubmit() {
    if (!this.registerForm.valid) return;
    this.isAuthLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.handleAuthSuccess('Account created successfully');
      },
      error: (err) => {
        this.isAuthLoading = false;
        this.showToast('error', 'Registration Failed', err || 'An error occurred');
      }
    });
  }

   handleAuthSuccess(message) {
    this.isAuthLoading = false;
    this.isLoggedIn = true;
    const user = this.authService.getCurrentUser();
    this.userName = _optionalChain([user, 'optionalAccess', _13 => _13.name]) || '';
    this.userEmail = _optionalChain([user, 'optionalAccess', _14 => _14.email]) || '';
    this.showToast('success', 'Success', message);
    this.closeAuthModal();
  }

  isLoginFieldInvalid(fieldName) {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isRegisterFieldInvalid(fieldName) {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

   showToast(type, title, message) {
    if (this.toast) {
      this.toast.type = type;
      this.toast.title = title;
      this.toast.message = message;
      this.toast.show();
    }
  }

  toggleCartDrawer() {
    this.isCartDrawerOpen = !this.isCartDrawerOpen;
    this.updateBodyScroll();
  }

  closeCartDrawer() {
    this.isCartDrawerOpen = false;
    this.updateBodyScroll();
  }

  removeFromCart(productId) {
    this.cartsService.removeFromCart(productId).subscribe();
  }

  updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartsService.updateCartItem({ productId, quantity }).subscribe();
    }
  }

   updateBodyScroll() {
    if (this.isCartDrawerOpen || this.isAuthModalOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  goToHome() {
    this.router.navigate(['/']);
    this.closeCartDrawer();
  }

  goToProducts() {
    this.router.navigate(['/products']);
    this.closeCartDrawer();
  }

  goToCart() {
    this.router.navigate(['/cart']);
    this.closeCartDrawer();
  }

  goToAuth() {
    this.toggleAuthModal('login');
  }

  onProfileLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.userName = '';
        this.userEmail = '';
        this.router.navigate(['/']);
        this.closeCartDrawer();
      }
    });
  }

  logout() {
    this.onProfileLogout();
  }
}

