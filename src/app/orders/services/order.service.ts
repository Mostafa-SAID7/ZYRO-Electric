import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
  history: OrderHistory[];
}

export interface OrderHistory {
  status: OrderStatus;
  timestamp: Date;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor() {
    this.loadOrders();
  }

  createOrder(items: OrderItem[], shippingAddress: string): Observable<Order> {
    return new Observable(observer => {
      setTimeout(() => {
        const order: Order = {
          id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          userId: 'user-1',
          items,
          total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          status: 'confirmed',
          shippingAddress,
          createdAt: new Date(),
          estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
          trackingNumber: 'TRACK-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
          history: [
            {
              status: 'pending',
              timestamp: new Date(Date.now() - 10 * 60 * 1000),
              message: 'Order placed'
            },
            {
              status: 'confirmed',
              timestamp: new Date(),
              message: 'Order confirmed by seller'
            }
          ]
        };

        const orders = this.ordersSubject.value;
        orders.push(order);
        this.ordersSubject.next([...orders]);
        this.saveOrders();
        observer.next(order);
        observer.complete();
      }, 1000);
    });
  }

  getOrders(): Order[] {
    return this.ordersSubject.value;
  }

  getOrderById(orderId: string): Order | undefined {
    return this.ordersSubject.value.find(o => o.id === orderId);
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus, message: string): void {
    const orders = this.ordersSubject.value.map(order => {
      if (order.id === orderId) {
        order.status = newStatus;
        order.history.push({
          status: newStatus,
          timestamp: new Date(),
          message
        });
      }
      return order;
    });
    this.ordersSubject.next([...orders]);
    this.saveOrders();
  }

  cancelOrder(orderId: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        this.updateOrderStatus(orderId, 'cancelled', 'Order cancelled by user');
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  private loadOrders(): void {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const orders = JSON.parse(stored).map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          estimatedDelivery: o.estimatedDelivery ? new Date(o.estimatedDelivery) : undefined,
          history: o.history.map((h: any) => ({
            ...h,
            timestamp: new Date(h.timestamp)
          }))
        }));
        this.ordersSubject.next(orders);
      }
    } catch {
      this.ordersSubject.next([]);
    }
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.ordersSubject.value));
  }
}
