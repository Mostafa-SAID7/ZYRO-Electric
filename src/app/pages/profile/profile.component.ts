import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { OrderService } from '../../orders/services/order.service';
import { UserProfile } from '../../auth/models';
import { Order } from '../../orders/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);

  userProfile: UserProfile | null = null;
  orders: Order[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        this.userProfile = profile;
      },
      error: (err) => console.error(err)
    });

    this.orderService.getOrders(1, 50).subscribe({
      next: (page) => {
        this.orders = page.items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
