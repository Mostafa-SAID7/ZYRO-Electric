


























export class CreditCardPayment  {
  getName() {
    return 'Credit Card';
  }

  processPayment(amount, details) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = { amount, details };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `CC-${Date.now()}`,
          message: 'Payment processed successfully'
        });
      }, 1000);
    });
  }

  validate(details) {
    return !!(details.cardNumber && details.cvv && details.expiryDate);
  }
}

export class PayPalPayment  {
  getName() {
    return 'PayPal';
  }

  processPayment(amount, details) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = { amount, details };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `PP-${Date.now()}`,
          message: 'PayPal payment processed'
        });
      }, 1500);
    });
  }

  validate(details) {
    return !!details.email;
  }
}

export class ApplePayPayment  {
  getName() {
    return 'Apple Pay';
  }

  processPayment(amount, details) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = { amount, details };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: `AP-${Date.now()}`,
          message: 'Apple Pay payment processed'
        });
      }, 800);
    });
  }

  validate(details) {
    return !!details.token;
  }
}

@Injectable({ providedIn: 'root' })
export class PaymentStrategyFactory {constructor() { PaymentStrategyFactory.prototype.__init.call(this); }
   __init() {this.strategies = new Map([
    ['creditcard', new CreditCardPayment()],
    ['paypal', new PayPalPayment()],
    ['applepay', new ApplePayPayment()]
  ])}

  getStrategy(type) {
    return this.strategies.get(type.toLowerCase());
  }

  registerStrategy(type, strategy) {
    this.strategies.set(type.toLowerCase(), strategy);
  }

  getAllStrategies() {
    return Array.from(this.strategies.values());
  }
}
