import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../../../carts/services/carts.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CartItem } from '../../../carts/models';
import { Product } from '../../../products/models';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCartDrawerOpen = false;
  cartItemCount = 0;
  cartItems: CartItem[] = [];
  cartTotal = 0;
  isLoggedIn = false;
  userName = '';

  constructor(
    private cartsService: CartsService,
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
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

  toggleCartDrawer(): void {
    this.isCartDrawerOpen = !this.isCartDrawerOpen;
    this.updateBodyScroll();
  }

  closeCartDrawer(): void {
    this.isCartDrawerOpen = false;
    this.updateBodyScroll();
  }

  removeFromCart(productId: string): void {
    this.cartsService.removeFromCart(productId).subscribe({
      next: () => {
        // Item removed, cart items will update via subscription
      }
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartsService.updateCartItem({ productId, quantity }).subscribe({
        next: () => {
          // Cart updated via subscription
        }
      });
    }
  }

  private updateBodyScroll(): void {
    if (this.isCartDrawerOpen) {
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
    this.router.navigate(['/auth/login']);
    this.closeCartDrawer();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.router.navigate(['/']);
        this.closeCartDrawer();
      }
    });
  }
}
