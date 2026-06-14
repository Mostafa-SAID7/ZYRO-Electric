import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService, Order } from '../../services/order.service';

@Component({
  selector: 'app-order-tracking',
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <!-- Header -->
      <div class="bg-card border-b border-border p-4">
        <div class="max-w-6xl mx-auto">
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold gradient-text">Order Tracking</h1>
            <button
              (click)="goBack()"
              class="btn-outline px-4 py-2 flex items-center gap-2">
              <lucide-icon name="arrow-left" class="w-4 h-4"></lucide-icon>
              Back
            </button>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto p-4 py-8" *ngIf="order; else noOrder">
        <!-- Order Header -->
        <app-ui-card padding="lg" class="mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p class="text-xs text-muted-foreground mb-1">ORDER ID</p>
              <p class="font-bold text-lg">{{ order.id }}</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">TRACKING NUMBER</p>
              <p class="font-mono text-sm">{{ order.trackingNumber }}</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">ORDER DATE</p>
              <p class="font-semibold">{{ order.createdAt | date:'short' }}</p>
            </div>
            <div>
              <p class="text-xs text-muted-foreground mb-1">ESTIMATED DELIVERY</p>
              <p class="font-semibold text-accent">{{ order.estimatedDelivery | date:'short' }}</p>
            </div>
          </div>
        </app-ui-card>

        <!-- Status Timeline -->
        <app-ui-card padding="lg" class="mb-6">
          <h2 class="text-lg font-bold text-accent mb-6 flex items-center gap-2">
            <lucide-icon name="activity" class="w-5 h-5"></lucide-icon>
            Order Status
          </h2>

          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-6 top-8 bottom-0 w-1 bg-gradient-to-b from-accent to-transparent"></div>

            <!-- Timeline Items -->
            <div class="space-y-8">
              <div
                *ngFor="let item of order.history; let last = last"
                class="relative pl-20">
                <!-- Dot -->
                <div
                  class="absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center"
                  [class]="isCurrentStatus(item.status) ? 'bg-accent/20' : 'bg-muted'">
                  <div
                    class="w-6 h-6 rounded-full flex items-center justify-center"
                    [class]="isCurrentStatus(item.status) ? 'bg-accent' : 'bg-border'">
                    <lucide-icon
                      [name]="getStatusIcon(item.status)"
                      class="w-3 h-3 text-white"></lucide-icon>
                  </div>
                </div>

                <!-- Content -->
                <div>
                  <h3 class="font-bold text-foreground capitalize">{{ item.status }}</h3>
                  <p class="text-sm text-muted-foreground">{{ item.message }}</p>
                  <p class="text-xs text-muted-foreground mt-1">{{ item.timestamp | date:'medium' }}</p>
                </div>
              </div>
            </div>
          </div>
        </app-ui-card>

        <!-- Shipping Address -->
        <app-ui-card padding="lg" class="mb-6">
          <h2 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
            <lucide-icon name="map-pin" class="w-5 h-5"></lucide-icon>
            Shipping To
          </h2>
          <p class="text-foreground">{{ order.shippingAddress }}</p>
        </app-ui-card>

        <!-- Order Items -->
        <app-ui-card padding="lg">
          <h2 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
            <lucide-icon name="shopping-bag" class="w-5 h-5"></lucide-icon>
            Order Items
          </h2>

          <div class="space-y-4">
            <div
              *ngFor="let item of order.items"
              class="flex items-center gap-4 pb-4 border-b border-border last:border-0">
              <img
                [src]="item.image"
                alt="{{ item.title }}"
                class="w-16 h-16 rounded object-cover">
              <div class="flex-1">
                <h4 class="font-semibold">{{ item.title }}</h4>
                <p class="text-sm text-muted-foreground">Qty: {{ item.quantity }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold">{{ item.price * item.quantity | number:'1.2-2' }} L.E</p>
                <p class="text-xs text-muted-foreground">{{ item.price | number:'1.2-2' }} each</p>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="mt-6 pt-4 border-t border-border">
            <div class="flex justify-between text-lg font-bold">
              <span>Order Total:</span>
              <span class="text-accent">{{ order.total | number:'1.2-2' }} L.E</span>
            </div>
          </div>
        </app-ui-card>

        <!-- Action Buttons -->
        <div class="flex gap-4 mt-6">
          <button
            [disabled]="order.status === 'cancelled' || order.status === 'delivered'"
            (click)="cancelOrder()"
            class="btn-outline flex-1 py-2 flex items-center justify-center gap-2">
            <lucide-icon name="x-circle" class="w-4 h-4"></lucide-icon>
            Cancel Order
          </button>
          <button
            (click)="downloadInvoice()"
            class="btn-primary flex-1 py-2 flex items-center justify-center gap-2">
            <lucide-icon name="download" class="w-4 h-4"></lucide-icon>
            Download Invoice
          </button>
        </div>
      </div>

      <!-- No Order -->
      <ng-template #noOrder>
        <div class="text-center py-20">
          <app-ui-not-found></app-ui-not-found>
        </div>
      </ng-template>
    </div>
  `,
  styles: []
})
export class TrackingComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.order = this.orderService.getOrderById(orderId) || null;
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
      cancelled: 'x-circle'
    };
    return icons[status] || 'info';
  }

  cancelOrder(): void {
    if (!this.order) return;
    this.orderService.cancelOrder(this.order.id).subscribe(() => {
      this.order = this.orderService.getOrderById(this.order!.id) || null;
    });
  }

  downloadInvoice(): void {
    console.log('Downloading invoice for order:', this.order?.id);
    // TODO: Implement invoice download
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
