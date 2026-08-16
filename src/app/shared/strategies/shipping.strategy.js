

// Open/Closed Principle: Open for extension, closed for modification
// New shipping methods can be added without modifying existing code








export class StandardShipping  {
  getName() {
    return 'Standard';
  }

  calculateCost(weight, distance) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _unused = { weight, distance };
    // Standard shipping: flat rate + minimal weight consideration
    return 10;
  }

  getDeliveryDays() {
    return 5;
  }

  isAvailable() {
    return true;
  }
}

export class ExpressShipping  {
  getName() {
    return 'Express';
  }

  calculateCost(weight, distance) {
    // Express shipping: weight-based with distance consideration
    return 20 + (weight * 0.5) + (distance * 0.01);
  }

  getDeliveryDays() {
    return 2;
  }

  isAvailable() {
    return true;
  }
}

export class OvernightShipping  {
  getName() {
    return 'Overnight';
  }

  calculateCost(weight, distance) {
    return 50 + (distance * 0.1);
  }

  getDeliveryDays() {
    return 1;
  }

  isAvailable() {
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class ShippingStrategyFactory {constructor() { ShippingStrategyFactory.prototype.__init.call(this); }
   __init() {this.strategies = new Map([
    ['standard', new StandardShipping()],
    ['express', new ExpressShipping()],
    ['overnight', new OvernightShipping()]
  ])}

  getStrategy(type) {
    return this.strategies.get(type.toLowerCase()) || this.strategies.get('standard');
  }

  registerStrategy(type, strategy) {
    this.strategies.set(type.toLowerCase(), strategy);
  }

  getAllStrategies() {
    return Array.from(this.strategies.values());
  }
}
