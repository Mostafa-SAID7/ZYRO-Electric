import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../models';
import { ORDER_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  // DIP: Inject via tokens (abstraction), not concrete classes
  private orderService = inject(ORDER_SERVICE_TOKEN);

  order: Order | null = null;

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(
        (order: Order) => {
          this.order = order;
        },
        (error) => {
          console.error('Order not found:', error);
        }
      );
    }
  }

  isCurrentStatus(status: string): boolean {
    return this.order?.status === status;
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      pending: 'clock',
      confirmed: 'check-circle',
      processing: 'zap',
      shipped: 'truck',
      delivered: 'package',
      cancelled: 'x-circle',
      returned: 'undo'
    };
    return icons[status] || 'info';
  }

  cancelOrder(): void {
    if (!this.order) return;
    this.orderService.cancelOrder(this.order.id, 'User requested cancellation').subscribe(
      (updatedOrder: Order) => {
        this.order = updatedOrder;
      },
      (error) => {
        console.error('Failed to cancel order:', error);
      }
    );
  }

  downloadInvoice(): void {
    console.log('Downloading invoice for order:', this.order?.id);
    // TODO: Implement invoice download
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
