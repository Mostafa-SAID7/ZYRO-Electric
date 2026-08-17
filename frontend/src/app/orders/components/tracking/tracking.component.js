 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ORDER_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';
import { InvoiceGeneratorService } from '../../services/invoice-generator.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent  {constructor() { TrackingComponent.prototype.__init.call(this);TrackingComponent.prototype.__init2.call(this);TrackingComponent.prototype.__init3.call(this);TrackingComponent.prototype.__init4.call(this);TrackingComponent.prototype.__init5.call(this); }
   __init() {this.route = inject(ActivatedRoute)}
   __init2() {this.router = inject(Router)}
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init3() {this.orderService = inject(ORDER_SERVICE_TOKEN)}
   __init4() {this.invoiceGenerator = inject(InvoiceGeneratorService)}

  __init5() {this.order = null}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).subscribe(
        (order) => {
          this.order = order;
        },
        (error) => {
          console.error('Order not found:', error);
        }
      );
    }
  }

  isCurrentStatus(status) {
    return _optionalChain([this, 'access', _ => _.order, 'optionalAccess', _2 => _2.status]) === status;
  }

  getStatusIcon(status) {
    const icons = {
      pending: 'loader-2',
      confirmed: 'check-circle',
      processing: 'activity',
      shipped: 'truck',
      delivered: 'package',
      cancelled: 'x-circle',
      returned: 'undo-2'
    };
    return icons[status] || 'alert-circle';
  }

  cancelOrder() {
    if (!this.order) return;
    this.orderService.cancelOrder(this.order.id, 'User requested cancellation').subscribe(
      (updatedOrder) => {
        this.order = updatedOrder;
      },
      (error) => {
        console.error('Failed to cancel order:', error);
      }
    );
  }

  downloadInvoice() {
    if (!this.order) {
      console.error('No order available to download invoice');
      return;
    }
    
    // Use centralized invoice generator service
    this.invoiceGenerator.generateInvoice(this.order);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
