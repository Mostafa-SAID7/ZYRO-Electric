

// Single Responsibility: Handle price calculations only
@Injectable({ providedIn: 'root' })
export class CalculationService {constructor() { CalculationService.prototype.__init.call(this);CalculationService.prototype.__init2.call(this); }
    __init() {this.TAX_RATE = 0.08} // 8% tax
    __init2() {this.SHIPPING_RATES = {
    standard: 10,
    express: 20,
    overnight: 50
  }}

  calculateTax(subtotal) {
    return Math.round(subtotal * this.TAX_RATE * 100) / 100;
  }

  calculateShipping(method) {
    return this.SHIPPING_RATES[method ] || 10;
  }

  calculateDiscount(subtotal, discountPercent) {
    return Math.round(subtotal * (discountPercent / 100) * 100) / 100;
  }

  calculateTotal(subtotal, tax, shipping, discount = 0) {
    return Math.max(0, Math.round((subtotal + tax + shipping - discount) * 100) / 100);
  }

  getShippingMethods() {
    return Object.keys(this.SHIPPING_RATES);
  }

  getShippingCost(method) {
    return this.SHIPPING_RATES[method ] || 0;
  }

  getTaxRate() {
    return this.TAX_RATE;
  }
}
