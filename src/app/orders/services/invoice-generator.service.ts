import { Injectable, inject } from '@angular/core';
import { PrintService } from '../../shared/services/print.service';
import { Order } from '../models';

/**
 * Generates invoice HTML for orders.
 * Uses centralized print service and template.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceGeneratorService {
  private printService = inject(PrintService);

  /**
   * Generates and prints an invoice for the given order.
   */
  generateInvoice(order: Order): void {
    const html = this.buildInvoiceHTML(order);
    const title = `Invoice-${order.id}`;
    
    // Load centralized print styles
    this.printService.print(html, title, ['/styles/print.scss']);
  }

  /**
   * Builds the invoice HTML from order data.
   * Uses external template structure for maintainability.
   */
  private buildInvoiceHTML(order: Order): string {
    return `
      <div class="print-document">
        ${this.buildHeader(order)}
        ${this.buildOrderInfo(order)}
        ${this.buildShippingAddress(order)}
        ${this.buildItemsTable(order)}
        ${this.buildSummary(order)}
        ${this.buildFooter()}
      </div>
    `;
  }

  private buildHeader(order: Order): string {
    return `
      <div class="print-header">
        <div>
          <div class="print-logo">ZYRO-Electric</div>
          <div class="print-subtitle">Premium Tech Accessories</div>
        </div>
        <div>
          <div class="print-title">INVOICE</div>
          <div class="print-subtitle">${order.id}</div>
        </div>
      </div>
    `;
  }

  private buildOrderInfo(order: Order): string {
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
      <div class="print-section">
        <div class="print-section-title">Order Information</div>
        <div class="print-info-grid">
          <div class="print-info-item">
            <span class="print-label">Order ID</span>
            <span class="print-value">${order.id}</span>
          </div>
          <div class="print-info-item">
            <span class="print-label">Order Date</span>
            <span class="print-value">${orderDate}</span>
          </div>
          <div class="print-info-item">
            <span class="print-label">Status</span>
            <span class="print-value">${order.status}</span>
          </div>
          <div class="print-info-item">
            <span class="print-label">Payment Method</span>
            <span class="print-value">${order.paymentMethod}</span>
          </div>
        </div>
      </div>
    `;
  }

  private buildShippingAddress(order: Order): string {
    return `
      <div class="print-section">
        <div class="print-section-title">Shipping Address</div>
        <div class="print-value">
          ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br>
          ${order.shippingAddress.street}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
          ${order.shippingAddress.country}<br>
          ${order.shippingAddress.phone}
        </div>
      </div>
    `;
  }

  private buildItemsTable(order: Order): string {
    const itemsRows = order.items
      .map(item => `
        <tr>
          <td>${item.title}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">$${item.price.toFixed(2)}</td>
          <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `)
      .join('');

    return `
      <div class="print-section">
        <div class="print-section-title">Order Items</div>
        <table class="print-table">
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
      </div>
    `;
  }

  private buildSummary(order: Order): string {
    const discount = order.discount || 0;
    
    return `
      <div class="print-summary">
        <div class="print-summary-row">
          <span class="print-summary-label">Subtotal</span>
          <span class="print-summary-value">$${order.subtotal.toFixed(2)}</span>
        </div>
        <div class="print-summary-row">
          <span class="print-summary-label">Shipping</span>
          <span class="print-summary-value">$${order.shipping.toFixed(2)}</span>
        </div>
        ${discount > 0 ? `
        <div class="print-summary-row">
          <span class="print-summary-label">Discount</span>
          <span class="print-summary-value" style="color: #10b981;">-$${discount.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="print-summary-row print-summary-total">
          <span class="print-summary-label">Total</span>
          <span class="print-summary-value">$${order.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  }

  private buildFooter(): string {
    return `
      <div class="print-footer">
        <p>Thank you for your business!</p>
        <p>ZYRO-Electric • support@zyro-electric.com • www.zyro-electric.com</p>
        <p>For questions about this invoice, please contact our support team.</p>
      </div>
    `;
  }
}
