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
    if (!this.order) {
      console.error('No order available to download invoice');
      return;
    }

    console.log('Generating invoice for order:', this.order.id);
    
    // Generate invoice HTML
    const invoiceHTML = this.generateInvoiceHTML();
    
    // Create a new window with the invoice
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      console.error('Failed to open print window. Please allow popups.');
      return;
    }
    
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }

  private generateInvoiceHTML(): string {
    if (!this.order) return '';
    
    const invoiceDate = new Date().toLocaleDateString();
    const orderDate = new Date(this.order.createdAt).toLocaleDateString();
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice #${this.order.id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            padding: 40px;
            color: #1a1a1a;
            line-height: 1.6;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #e5e7eb;
            padding: 40px;
            background: white;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #3b82f6;
          }
          .company-info h1 {
            font-size: 28px;
            color: #3b82f6;
            margin-bottom: 5px;
            font-weight: 800;
          }
          .company-info p {
            color: #6b7280;
            font-size: 14px;
          }
          .invoice-meta {
            text-align: right;
          }
          .invoice-meta h2 {
            font-size: 24px;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .invoice-meta p {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0;
          }
          .billing-info {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            gap: 40px;
          }
          .billing-section {
            flex: 1;
          }
          .billing-section h3 {
            font-size: 16px;
            color: #1f2937;
            margin-bottom: 10px;
            font-weight: 600;
          }
          .billing-section p {
            color: #6b7280;
            font-size: 14px;
            margin: 5px 0;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          .items-table thead {
            background: #f9fafb;
          }
          .items-table th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #1f2937;
            border-bottom: 2px solid #e5e7eb;
            font-size: 14px;
          }
          .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .items-table tr:last-child td {
            border-bottom: none;
          }
          .total-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: right;
          }
          .total-row {
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
            font-size: 14px;
          }
          .total-row .label {
            width: 150px;
            text-align: right;
            margin-right: 20px;
            color: #6b7280;
          }
          .total-row .value {
            width: 120px;
            text-align: right;
            font-weight: 600;
            color: #1f2937;
          }
          .grand-total {
            font-size: 18px;
            padding-top: 10px;
            border-top: 2px solid #3b82f6;
            margin-top: 10px;
          }
          .grand-total .label {
            color: #1f2937;
          }
          .grand-total .value {
            color: #3b82f6;
            font-size: 20px;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #9ca3af;
            font-size: 12px;
          }
          @media print {
            body { padding: 0; }
            .invoice-container { border: none; padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <!-- Header -->
          <div class="header">
            <div class="company-info">
              <h1>🛒 ZYRO-Electric</h1>
              <p>Premium Electronics Marketplace</p>
              <p>support@zyro-electric.com</p>
            </div>
            <div class="invoice-meta">
              <h2>INVOICE</h2>
              <p><strong>Invoice #:</strong> INV-${this.order.id}</p>
              <p><strong>Order #:</strong> ${this.order.id}</p>
              <p><strong>Date:</strong> ${invoiceDate}</p>
              <p><strong>Status:</strong> ${this.order.status.toUpperCase()}</p>
            </div>
          </div>

          <!-- Billing Information -->
          <div class="billing-info">
            <div class="billing-section">
              <h3>Bill To:</h3>
              <p><strong>${this.order.userId}</strong></p>
              <p>${this.order.shippingAddress || 'Address not provided'}</p>
            </div>
            <div class="billing-section">
              <h3>Order Details:</h3>
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Payment Method:</strong> ${this.order.paymentMethod || 'Credit Card'}</p>
              <p><strong>Shipping:</strong> Standard Delivery</p>
            </div>
          </div>

          <!-- Items Table -->
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th style="text-align: center;">Quantity</th>
                <th style="text-align: right;">Unit Price</th>
                <th style="text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${this.order.items.map(item => `
                <tr>
                  <td>
                    <strong>${item.productId}</strong><br>
                    <small style="color: #9ca3af;">SKU: ${item.productId}</small>
                  </td>
                  <td style="text-align: center;">${item.quantity}</td>
                  <td style="text-align: right;">$${item.price.toFixed(2)}</td>
                  <td style="text-align: right;"><strong>$${(item.price * item.quantity).toFixed(2)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Totals -->
          <div class="total-section">
            <div class="total-row">
              <span class="label">Subtotal:</span>
              <span class="value">$${this.order.subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="label">Tax (${(this.order.tax / this.order.subtotal * 100).toFixed(0)}%):</span>
              <span class="value">$${this.order.tax.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span class="label">Shipping:</span>
              <span class="value">$${this.order.shippingCost.toFixed(2)}</span>
            </div>
            ${this.order.discount > 0 ? `
            <div class="total-row">
              <span class="label">Discount:</span>
              <span class="value" style="color: #10b981;">-$${this.order.discount.toFixed(2)}</span>
            </div>
            ` : ''}
            <div class="total-row grand-total">
              <span class="label">TOTAL:</span>
              <span class="value">$${this.order.total.toFixed(2)}</span>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>For questions about this invoice, please contact support@zyro-electric.com</p>
            <p style="margin-top: 20px;">This is a computer-generated invoice. No signature required.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
