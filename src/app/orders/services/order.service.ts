import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, delay, map } from 'rxjs/operators';
import {
  Order,
  OrderItem,
  OrderStatus,
  OrderPaymentStatus,
  OrderPage,
  OrderFilter,
  OrderStatistics,
  ShippingAddress,
  PaymentMethod,
  OrderHistory
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [];

  // State Management
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public orders$ = this.ordersSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor() {
    this.initializeOrders();
  }

  // ============ Order Operations ============

  createOrder(items: OrderItem[], shippingAddress: ShippingAddress, paymentMethod: PaymentMethod): Observable<Order> {
    this.setLoading(true);

    // Calculate totals
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const tax = Math.round(subtotal * 0.10 * 100) / 100;
    const shipping = 10;
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: 'user-1', // Should come from auth service
      items,
      total,
      subtotal,
      tax,
      shipping,
      discount: undefined,
      status: 'pending',
      paymentStatus: 'pending',
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDelivery: this.getEstimatedDelivery(),
      history: [
        {
          status: 'pending',
          timestamp: new Date(),
          message: 'Order created successfully'
        }
      ]
    };

    return of(newOrder).pipe(
      delay(500),
      tap(order => {
        this.mockOrders.unshift(order);
        this.ordersSubject.next([...this.mockOrders]);
        this.saveOrdersToStorage();
        this.setLoading(false);
      }),
      catchError(error => {
        this.setError('Failed to create order');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  getOrders(page: number = 1, pageSize: number = 10, filter?: OrderFilter): Observable<OrderPage> {
    this.setLoading(true);

    return of(this.filterOrders(page, pageSize, filter)).pipe(
      delay(300),
      tap(() => this.setLoading(false)),
      catchError(error => {
        this.setError('Failed to load orders');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  getOrderById(id: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === id);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    return of(order).pipe(delay(200));
  }

  // ============ Order Status Management ============

  updateOrderStatus(orderId: string, status: OrderStatus, message: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === orderId);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    order.status = status;
    order.updatedAt = new Date();
    order.history.push({
      status,
      timestamp: new Date(),
      message
    });

    // Update payment status based on order status
    if (status === 'confirmed' || status === 'processing' || status === 'shipped' || status === 'delivered') {
      order.paymentStatus = 'paid';
    }

    this.ordersSubject.next([...this.mockOrders]);
    this.saveOrdersToStorage();

    return of(order).pipe(delay(300));
  }

  cancelOrder(orderId: string, reason: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === orderId);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    if (['shipped', 'delivered', 'cancelled', 'returned'].includes(order.status)) {
      return throwError(() => new Error('Cannot cancel order in current status'));
    }

    order.status = 'cancelled';
    order.cancellationReason = reason;
    order.updatedAt = new Date();
    order.history.push({
      status: 'cancelled',
      timestamp: new Date(),
      message: `Order cancelled: ${reason}`
    });

    this.ordersSubject.next([...this.mockOrders]);
    this.saveOrdersToStorage();

    return of(order).pipe(delay(300));
  }

  returnOrder(orderId: string, reason: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === orderId);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    if (order.status !== 'delivered') {
      return throwError(() => new Error('Only delivered orders can be returned'));
    }

    order.status = 'returned';
    order.cancellationReason = reason;
    order.updatedAt = new Date();
    order.history.push({
      status: 'returned',
      timestamp: new Date(),
      message: `Order returned: ${reason}`
    });

    this.ordersSubject.next([...this.mockOrders]);
    this.saveOrdersToStorage();

    return of(order).pipe(delay(300));
  }

  // ============ Order Statistics ============

  getOrderStatistics(): Observable<OrderStatistics> {
    const totalOrders = this.mockOrders.length;
    const totalSpent = this.mockOrders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    const lastOrderDate = this.mockOrders.length > 0 ? this.mockOrders[0].createdAt : new Date();

    const ordersByStatus = {
      pending: this.mockOrders.filter(o => o.status === 'pending').length,
      confirmed: this.mockOrders.filter(o => o.status === 'confirmed').length,
      processing: this.mockOrders.filter(o => o.status === 'processing').length,
      shipped: this.mockOrders.filter(o => o.status === 'shipped').length,
      delivered: this.mockOrders.filter(o => o.status === 'delivered').length,
      cancelled: this.mockOrders.filter(o => o.status === 'cancelled').length,
      returned: this.mockOrders.filter(o => o.status === 'returned').length
    };

    const stats: OrderStatistics = {
      totalOrders,
      totalSpent: Math.round(totalSpent * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      lastOrderDate,
      ordersByStatus
    };

    return of(stats).pipe(delay(200));
  }

  // ============ Private Methods ============

  private initializeOrders(): void {
    const stored = this.loadOrdersFromStorage();
    this.mockOrders = stored;
    this.ordersSubject.next([...this.mockOrders]);
  }

  private filterOrders(page: number, pageSize: number, filter?: OrderFilter): OrderPage {
    let results = [...this.mockOrders];

    if (filter) {
      // Filter by status
      if (filter.status && filter.status.length > 0) {
        results = results.filter(o => filter.status!.includes(o.status));
      }

      // Filter by date range
      if (filter.startDate) {
        results = results.filter(o => new Date(o.createdAt) >= filter.startDate!);
      }
      if (filter.endDate) {
        results = results.filter(o => new Date(o.createdAt) <= filter.endDate!);
      }

      // Filter by amount range
      if (filter.minAmount !== undefined) {
        results = results.filter(o => o.total >= filter.minAmount!);
      }
      if (filter.maxAmount !== undefined) {
        results = results.filter(o => o.total <= filter.maxAmount!);
      }

      // Filter by search query
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        results = results.filter(o =>
          o.id.toLowerCase().includes(query) ||
          o.shippingAddress.firstName.toLowerCase().includes(query) ||
          o.shippingAddress.lastName.toLowerCase().includes(query)
        );
      }
    }

    const total = results.length;
    const totalPages = Math.ceil(total / pageSize);
    const items = results.slice((page - 1) * pageSize, page * pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  private setLoading(isLoading: boolean): void {
    this.isLoadingSubject.next(isLoading);
  }

  private setError(error: string | null): void {
    this.errorSubject.next(error);
  }

  private saveOrdersToStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.mockOrders));
  }

  private loadOrdersFromStorage(): Order[] {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) {
        const orders = JSON.parse(stored);
        // Convert date strings back to Date objects
        return orders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          actualDelivery: order.actualDelivery ? new Date(order.actualDelivery) : undefined,
          history: order.history.map((h: any) => ({
            ...h,
            timestamp: new Date(h.timestamp)
          }))
        }));
      }
      return [];
    } catch {
      return [];
    }
  }

  private getEstimatedDelivery(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    return date;
  }
}
