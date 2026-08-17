import { inject } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';










import { StorageService } from '../../shared/services/storage.service';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   __init() {this.storageService = inject(StorageService)}
   __init2() {this.cacheService = inject(CacheService)}

   __init3() {this.mockOrders = []}

  // State Management
   __init4() {this.ordersSubject = new BehaviorSubject([])}
   __init5() {this.isLoadingSubject = new BehaviorSubject(false)}
   __init6() {this.errorSubject = new BehaviorSubject(null)}

   __init7() {this.orders$ = this.ordersSubject.asObservable()}
   __init8() {this.isLoading$ = this.isLoadingSubject.asObservable()}
   __init9() {this.error$ = this.errorSubject.asObservable()}

  // Cache configuration
    __init10() {this.ORDER_LIST_CACHE_TTL = 15 * 60 * 1000} // 15 minutes
    __init11() {this.ORDER_DETAIL_CACHE_TTL = 60 * 60 * 1000} // 1 hour
    __init12() {this.ORDER_STATS_CACHE_TTL = 30 * 60 * 1000} // 30 minutes
    __init13() {this.RECENT_ORDERS_STORAGE_KEY = 'recent_orders'}

  constructor() {;OrderService.prototype.__init.call(this);OrderService.prototype.__init2.call(this);OrderService.prototype.__init3.call(this);OrderService.prototype.__init4.call(this);OrderService.prototype.__init5.call(this);OrderService.prototype.__init6.call(this);OrderService.prototype.__init7.call(this);OrderService.prototype.__init8.call(this);OrderService.prototype.__init9.call(this);OrderService.prototype.__init10.call(this);OrderService.prototype.__init11.call(this);OrderService.prototype.__init12.call(this);OrderService.prototype.__init13.call(this);
    this.initializeOrders();
  }

  // ============ Order Operations ============

  createOrder(items, shippingAddress, paymentMethod) {
    this.setLoading(true);

    // Calculate totals
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const tax = Math.round(subtotal * 0.10 * 100) / 100;
    const shipping = 10;
    const total = subtotal + tax + shipping;

    const newOrder = {
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
        
        // Cache newly created order
        this.cacheService.set(`order:${order.id}`, order, this.ORDER_DETAIL_CACHE_TTL);
        
        // Add to recent orders in localStorage
        this.addRecentOrder(order);
        
        // Invalidate list cache since we added a new order
        this.invalidateOrderListCache();
        
        this.setLoading(false);
      }),
      catchError(error => {
        this.setError('Failed to create order');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  getOrders(page = 1, pageSize = 10, filter) {
    const cacheKey = this.generateOrderListCacheKey(page, pageSize, filter);
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      this.setLoading(false);
      return of(cached);
    }

    this.setLoading(true);

    return of(this.filterOrders(page, pageSize, filter)).pipe(
      delay(300),
      tap(result => {
        // Cache the result
        this.cacheService.set(cacheKey, result, this.ORDER_LIST_CACHE_TTL);
        this.setLoading(false);
      }),
      catchError(error => {
        this.setError('Failed to load orders');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  getOrderById(id) {
    const cacheKey = `order:${id}`;
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

    const order = this.mockOrders.find(o => o.id === id);

    if (!order) {
      return throwError(() => new Error('Order not found'));
    }

    return of(order).pipe(
      delay(200),
      tap(result => {
        // Cache individual order
        this.cacheService.set(cacheKey, result, this.ORDER_DETAIL_CACHE_TTL);
      })
    );
  }

  // ============ Order Status Management ============

  updateOrderStatus(orderId, status, message) {
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

    // Invalidate cache for this order
    this.cacheService.set(`order:${orderId}`, order, this.ORDER_DETAIL_CACHE_TTL);
    this.invalidateOrderListCache();

    return of(order).pipe(delay(300));
  }

  cancelOrder(orderId, reason) {
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

    // Invalidate cache for this order
    this.cacheService.set(`order:${orderId}`, order, this.ORDER_DETAIL_CACHE_TTL);
    this.invalidateOrderListCache();

    return of(order).pipe(delay(300));
  }

  returnOrder(orderId, reason) {
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

    // Invalidate cache for this order
    this.cacheService.set(`order:${orderId}`, order, this.ORDER_DETAIL_CACHE_TTL);
    this.invalidateOrderListCache();

    return of(order).pipe(delay(300));
  }

  // ============ Order Statistics ============

  getOrderStatistics() {
    const cacheKey = 'order:statistics';
    
    // Check cache first
    const cached = this.cacheService.get(cacheKey);
    if (cached) {
      return of(cached);
    }

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

    const stats = {
      totalOrders,
      totalSpent: Math.round(totalSpent * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      lastOrderDate,
      ordersByStatus
    };

    return of(stats).pipe(
      delay(200),
      tap(result => {
        // Cache statistics
        this.cacheService.set(cacheKey, result, this.ORDER_STATS_CACHE_TTL);
      })
    );
  }

  // ============ Private Methods ============

   initializeOrders() {
    const stored = this.loadOrdersFromStorage();
    this.mockOrders = stored;
    this.ordersSubject.next([...this.mockOrders]);
  }

   filterOrders(page, pageSize, filter) {
    let results = [...this.mockOrders];

    if (filter) {
      // Filter by status
      if (filter.status && filter.status.length > 0) {
        results = results.filter(o => filter.status.includes(o.status));
      }

      // Filter by date range
      if (filter.startDate) {
        results = results.filter(o => new Date(o.createdAt) >= filter.startDate);
      }
      if (filter.endDate) {
        results = results.filter(o => new Date(o.createdAt) <= filter.endDate);
      }

      // Filter by amount range
      if (filter.minAmount !== undefined) {
        results = results.filter(o => o.total >= filter.minAmount);
      }
      if (filter.maxAmount !== undefined) {
        results = results.filter(o => o.total <= filter.maxAmount);
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

   setLoading(isLoading) {
    this.isLoadingSubject.next(isLoading);
  }

   setError(error) {
    this.errorSubject.next(error);
  }

   saveOrdersToStorage() {
    this.storageService.set('orders', this.mockOrders, 'localStorage', 0); // Permanent storage
  }

   loadOrdersFromStorage() {
    try {
      const stored = this.storageService.get('orders', 'localStorage');
      if (stored) {
        // Convert date strings back to Date objects
        return stored.map((order) => ({
          id: order['id'] ,
          userId: order['userId'] ,
          items: order['items'] ,
          total: order['total'] ,
          subtotal: order['subtotal'] ,
          tax: order['tax'] ,
          shipping: order['shipping'] ,
          discount: order['discount'] ,
          status: order['status'] ,
          paymentStatus: order['paymentStatus'] ,
          shippingAddress: order['shippingAddress'] ,
          billingAddress: order['billingAddress'] ,
          paymentMethod: order['paymentMethod'] ,
          createdAt: new Date(order['createdAt'] ),
          updatedAt: new Date(order['updatedAt'] ),
          estimatedDelivery: order['estimatedDelivery'] ? new Date(order['estimatedDelivery'] ) : undefined,
          actualDelivery: order['actualDelivery'] ? new Date(order['actualDelivery'] ) : undefined,
          trackingNumber: order['trackingNumber'] ,
          history: (order['history'] ).map((h) => ({
            status: h['status'] ,
            timestamp: new Date(h['timestamp'] ),
            message: h['message'] ,
            metadata: h['metadata'] 
          })) ,
          notes: order['notes'] ,
          cancellationReason: order['cancellationReason'] 
        } ));
      }
      return [];
    } catch (error) {
      console.error('Error loading orders from storage:', error);
      return [];
    }
  }

   getEstimatedDelivery() {
    const date = new Date();
    date.setDate(date.getDate() + 5); // 5 days from now
    return date;
  }

  /**
   * Generate cache key for order list with filter parameters
   */
   generateOrderListCacheKey(page, pageSize, filter) {
    if (!filter) {
      return `order:list:${page}:${pageSize}`;
    }
    try {
      const hash = JSON.stringify(filter)
        .split('')
        .reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0)
        .toString(36);
      return `order:list:${page}:${pageSize}:${hash}`;
    } catch (e) {
      return `order:list:${page}:${pageSize}`;
    }
  }

  /**
   * Invalidate all order list caches
   */
   invalidateOrderListCache() {
    this.cacheService.invalidate('order:list:*');
    this.cacheService.remove('order:statistics');
  }

  /**
   * Add order to recent orders in localStorage
   */
   addRecentOrder(order, maxRecent = 10) {
    try {
      const recent = this.storageService.get(this.RECENT_ORDERS_STORAGE_KEY, 'localStorage') || [];
      const updated = [order, ...recent].slice(0, maxRecent);
      this.storageService.set(this.RECENT_ORDERS_STORAGE_KEY, updated, 'localStorage', 30 * 24 * 60 * 60 * 1000); // 30 days
    } catch (error) {
      console.error('Error adding recent order:', error);
    }
  }

  /**
   * Get recent orders from localStorage
   */
  getRecentOrders() {
    try {
      return this.storageService.get(this.RECENT_ORDERS_STORAGE_KEY, 'localStorage') || [];
    } catch (error) {
      console.error('Error getting recent orders:', error);
      return [];
    }
  }
}
