import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartsService } from '../../../carts/services/carts.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCartDrawerOpen = false;
  cartItemCount = 0;
  isLoggedIn = false;
  userName = '';

  constructor(
    private cartsService: CartsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartsService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    const user = this.authService.getCurrentUser();
    this.isLoggedIn = !!user;
    this.userName = user?.name || '';
  }

  toggleCartDrawer(): void {
    this.isCartDrawerOpen = !this.isCartDrawerOpen;
  }

  closeCartDrawer(): void {
    this.isCartDrawerOpen = false;
  }

  goToHome(): void {
    this.router.navigate(['/products']);
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
        this.router.navigate(['/products']);
        this.closeCartDrawer();
      }
    });
  }
}
