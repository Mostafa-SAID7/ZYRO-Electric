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
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            padding: 40px;
            background: #0A0A0A;
            color: #FAFAFA;
            line-height: 1.6;
          }
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #222222;
            padding: 40px;
            background: #111111;
            border-radius: 1rem;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #E8C547;
          }
          .company-info h1 {
            font-size: 28px;
            color: #E8C547;
            margin-bottom: 5px;
            font-weight: 800;
          }
          .company-info p {
            color: #888888;
            font-size: 14px;
          }
          .invoice-meta {
            text-align: right;
          }
          .invoice-meta h2 {
            font-size: 24px;
            color: #FAFAFA;
            margin-bottom: 10px;
            font-weight: 800;
          }
          .invoice-meta p {
            color: #888888;
            font-size: 14px;
            margin: 5px 0;
          }
          .invoice-meta p strong {
            color: #FAFAFA;
          }
          .billing-info {
            display: flex;
            justify-content: space-between;
            margin: 30px 0;
            gap: 40px;
          }
          .billing-section {
            flex: 1;
            background: #1A1A1A;
            padding: 20px;
            border-radius: 0.75rem;
            border: 1px solid #222222;
          }
          .billing-section h3 {
            font-size: 16px;
            color: #E8C547;
            margin-bottom: 12px;
            font-weight: 700;
          }
          .billing-section p {
            color: #888888;
            font-size: 14px;
            margin: 8px 0;
          }
          .billing-section p strong {
            color: #FAFAFA;
          }
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
            background: #1A1A1A;
            border-radius: 0.75rem;
            overflow: hidden;
          }
          .items-table thead {
            background: #222222;
          }
          .items-table th {
            padding: 16px;
            text-align: left;
            font-weight: 700;
            color: #E8C547;
            border-bottom: 2px solid #333333;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .items-table td {
            padding: 16px;
            border-bottom: 1px solid #222222;
            color: #888888;
            font-size: 14px;
          }
          .items-table td strong {
            color: #FAFAFA;
          }
          .items-table tr:last-child td {
            border-bottom: none;
          }
          .total-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #222222;
            text-align: right;
          }
          .total-row {
            display: flex;
            justify-content: flex-end;
            margin: 12px 0;
            font-size: 15px;
          }
          .total-row .label {
            width: 180px;
            text-align: right;
            margin-right: 30px;
            color: #888888;
            font-weight: 600;
          }
          .total-row .value {
            width: 140px;
            text-align: right;
            font-weight: 700;
            color: #FAFAFA;
          }
          .grand-total {
            font-size: 20px;
            padding-top: 15px;
            border-top: 2px solid #E8C547;
            margin-top: 15px;
            background: linear-gradient(90deg, transparent, #E8C547/10);
            padding: 20px;
            border-radius: 0.5rem;
          }
          .grand-total .label {
            color: #FAFAFA;
            font-weight: 800;
            letter-spacing: 1px;
          }
          .grand-total .value {
            color: #E8C547;
            font-size: 24px;
            font-weight: 900;
          }
          .footer {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #222222;
            text-align: center;
            color: #666666;
            font-size: 12px;
          }
          .footer p {
            margin: 8px 0;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            background: #E8C547;
            color: #0A0A0A;
            border-radius: 999px;
            font-weight: 800;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          @media print {
            body { 
              padding: 20px;
              background: white;
              color: #0A0A0A;
            }
            .invoice-container { 
              border: 2px solid #222222;
              padding: 30px;
              background: white;
            }
            .header {
              border-bottom-color: #E8C547;
            }
            .company-info h1 {
              color: #E8C547;
            }
            .company-info p,
            .invoice-meta p {
              color: #666666;
            }
            .invoice-meta h2,
            .invoice-meta p strong,
            .billing-section p strong,
            .items-table td strong,
            .total-row .value,
            .grand-total .label {
              color: #0A0A0A;
            }
            .billing-section {
              background: #F9F9F9;
              border-color: #E5E5E5;
            }
            .billing-section h3 {
              color: #E8C547;
            }
            .billing-section p {
              color: #666666;
            }
            .items-table {
              background: white;
            }
            .items-table thead {
              background: #F9F9F9;
            }
            .items-table th {
              color: #E8C547;
              border-bottom-color: #E5E5E5;
            }
            .items-table td {
              color: #666666;
              border-bottom-color: #E5E5E5;
            }
            .total-section {
              border-top-color: #E5E5E5;
            }
            .total-row .label {
              color: #666666;
            }
            .grand-total {
              border-top-color: #E8C547;
              background: #FFF9E6;
            }
            .grand-total .value {
              color: #E8C547;
            }
            .footer {
              border-top-color: #E5E5E5;
              color: #999999;
            }
            .status-badge {
              background: #E8C547;
              color: #0A0A0A;
            }
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
              <p><strong>Status:</strong> <span class="status-badge">${this.order.status}</span></p>
            </div>
          </div>

          <!-- Billing Information -->
          <div class="billing-info">
            <div class="billing-section">
              <h3>Bill To:</h3>
              <p><strong>${this.order.userId}</strong></p>
              <p>${this.order.shippingAddress?.street || 'Address not provided'}</p>
              <p>${this.order.shippingAddress?.city || ''} ${this.order.shippingAddress?.state || ''}</p>
              <p>${this.order.shippingAddress?.zipCode || ''}</p>
            </div>
            <div class="billing-section">
              <h3>Order Details:</h3>
              <p><strong>Order Date:</strong> ${orderDate}</p>
              <p><strong>Payment Method:</strong> ${this.order.paymentMethod?.type || 'Credit Card'}</p>
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
                    <strong>${item.title || item.productId}</strong><br>
                    <small style="color: #666666;">SKU: ${item.productId}</small>
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
              <span class="value">$${this.order.shipping.toFixed(2)}</span>
            </div>
            ${this.order.discount && this.order.discount > 0 ? `
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
