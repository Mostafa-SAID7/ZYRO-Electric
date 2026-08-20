import { Component, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartItem } from '../../../carts/models';
import { Product } from '../../../products/models';
import { UiToastComponent } from '../../../shared/ui/components/toast/toast.component';
import { CART_SERVICE_TOKEN, AUTH_SERVICE_TOKEN, PRODUCT_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // DIP: Inject via tokens (abstraction), not concrete classes
  private cartsService = inject(CART_SERVICE_TOKEN);
  private authService = inject(AUTH_SERVICE_TOKEN);
  private productsService = inject(PRODUCT_SERVICE_TOKEN);
  private router = inject(Router);
  private renderer = inject(Renderer2);
  private fb = inject(FormBuilder);

  @ViewChild('toast') toast!: UiToastComponent;

  isCartDrawerOpen = false;
  cartItemCount = 0;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  isLoggedIn = false;
  userName = '';
  userEmail = '';

  // Theme state
  isDarkMode = true;

  // Auth Modal state
  isAuthModalOpen = false;
  authModalMode: 'login' | 'register' = 'login';
  isAuthLoading = false;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {
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
    this.userName = user?.name || '';
    this.userEmail = user?.email || '';

    // Subscribe to auth state changes to update header when user logs in/out
    this.authService.authState$.subscribe(state => {
      this.isLoggedIn = state.isAuthenticated;
      this.userName = state.user?.name || '';
      this.userEmail = state.user?.email || '';
    });
  }

  private passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private loadProductDetails(items: CartItem[]): void {
    items.forEach(item => {
      if (!item.product) {
        this.productsService.getProductById(item.productId).subscribe({
          next: (product: Product) => {
            item.product = product;
          }
        });
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.removeClass(document.body, 'light');
    } else {
      this.renderer.addClass(document.body, 'light');
    }
  }

  toggleAuthModal(mode: 'login' | 'register' = 'login'): void {
    if (this.isLoggedIn) return;
    this.authModalMode = mode;
    this.isAuthModalOpen = true;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  closeAuthModal(): void {
    this.isAuthModalOpen = false;
    this.loginForm.reset();
    this.registerForm.reset();
    if (!this.isCartDrawerOpen) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  switchAuthMode(mode: 'login' | 'register'): void {
    this.authModalMode = mode;
    this.loginForm.reset();
    this.registerForm.reset();
  }

  onLoginSubmit(): void {
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

  onRegisterSubmit(): void {
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

  private handleAuthSuccess(message: string): void {
    this.isAuthLoading = false;
    this.isLoggedIn = true;
    const user = this.authService.getCurrentUser();
    this.userName = user?.name || '';
    this.userEmail = user?.email || '';
    this.showToast('success', 'Success', message);
    this.closeAuthModal();
  }

  isLoginFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isRegisterFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private showToast(type: 'success' | 'error' | 'info' | 'warning', title: string, message: string): void {
    if (this.toast) {
      this.toast.type = type;
      this.toast.title = title;
      this.toast.message = message;
      this.toast.show();
    }
  }

  toggleCartDrawer(): void {
    this.isCartDrawerOpen = !this.isCartDrawerOpen;
    this.updateBodyScroll();
  }

  closeCartDrawer(): void {
    this.isCartDrawerOpen = false;
    this.updateBodyScroll();
  }

  removeFromCart(productId: string): void {
    this.cartsService.removeFromCart(productId).subscribe();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartsService.updateCartItem({ productId, quantity }).subscribe();
    }
  }

  private updateBodyScroll(): void {
    if (this.isCartDrawerOpen || this.isAuthModalOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
    this.closeCartDrawer();
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
    this.closeCartDrawer();
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
    this.closeCartDrawer();
  }

  goToAuth(): void {
    this.toggleAuthModal('login');
  }

  onProfileLogout(): void {
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

  logout(): void {
    this.onProfileLogout();
  }
}

