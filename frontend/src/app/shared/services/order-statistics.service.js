


// Single Responsibility: Handle order statistics and analytics only
@Injectable({ providedIn: 'root' })
export class OrderStatisticsService {
  calculateTotalRevenue(orders) {
    return orders.reduce((total, order) => total + (order.total || 0), 0);
  }

  calculateAverageOrderValue(orders) {
    if (orders.length === 0) return 0;
    return this.calculateTotalRevenue(orders) / orders.length;
  }

  calculateTotalOrders(orders) {
    return orders.length;
  }

  calculateOrdersByStatus(orders) {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} );
  }

  calculateMonthlyRevenue(orders) {
    return orders.reduce((acc, order) => {
      const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
      acc[month] = (acc[month] || 0) + (order.total || 0);
      return acc;
    }, {} );
  }

  getTopProducts(orders) {
    const productMap = new Map();
    orders.forEach(order => {
      order.items.forEach(item => {
        productMap.set(item.productId, (productMap.get(item.productId) || 0) + item.quantity);
      });
    });
    return Array.from(productMap.entries())
      .map(([productId, quantity]) => ({ productId, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }

  calculateRepeatCustomers(orders) {
    const userMap = new Map();
    orders.forEach(order => {
      userMap.set(order.userId, (userMap.get(order.userId) || 0) + 1);
    });
    return Array.from(userMap.values()).filter(count => count > 1).length;
  }
}
