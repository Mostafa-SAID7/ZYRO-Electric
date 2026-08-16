 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }














export class PercentageDiscount  {
  constructor( percent) {;this.percent = percent;}

  getType() {
    return 'PERCENTAGE';
  }

  calculate(context) {
    return Math.round(context.subtotal * (this.percent / 100) * 100) / 100;
  }

  validate(context) {
    return (
      typeof _optionalChain([context, 'optionalAccess', _ => _.subtotal]) === 'number' &&
      Number.isFinite(context.subtotal) &&
      context.subtotal >= 0 &&
      this.percent > 0 &&
      this.percent <= 100
    );
  }
}

export class FixedDiscount  {
  constructor( amount) {;this.amount = amount;}

  getType() {
    return 'FIXED';
  }

  calculate(context) {
    return Math.min(this.amount, context.subtotal);
  }

  validate(context) {
    return (
      typeof _optionalChain([context, 'optionalAccess', _2 => _2.subtotal]) === 'number' &&
      Number.isFinite(context.subtotal) &&
      context.subtotal >= 0 &&
      this.amount > 0
    );
  }
}

export class BulkDiscount  {
  constructor( minQuantity,  discountPercent) {;this.minQuantity = minQuantity;this.discountPercent = discountPercent;}

  getType() {
    return 'BULK';
  }

  calculate(context) {
    // Only apply discount if item count meets minimum quantity threshold
    if (!context.itemCount || context.itemCount < this.minQuantity) {
      return 0;
    }
    return Math.round(context.subtotal * (this.discountPercent / 100) * 100) / 100;
  }

  validate(context) {
    return (
      typeof _optionalChain([context, 'optionalAccess', _3 => _3.subtotal]) === 'number' &&
      Number.isFinite(context.subtotal) &&
      context.subtotal >= 0 &&
      typeof _optionalChain([context, 'optionalAccess', _4 => _4.itemCount]) === 'number' &&
      context.itemCount >= this.minQuantity &&
      this.discountPercent > 0 &&
      this.discountPercent <= 100
    );
  }
}

@Injectable({ providedIn: 'root' })
export class DiscountStrategyFactory {constructor() { DiscountStrategyFactory.prototype.__init.call(this); }
   __init() {this.strategies = new Map()}

  registerStrategy(type, strategy) {
    this.strategies.set(type.toUpperCase(), strategy);
  }

  getStrategy(type) {
    return this.strategies.get(type.toUpperCase());
  }

  applyDiscount(strategy, context) {
    if (!strategy.validate(context)) {
      return 0;
    }
    return strategy.calculate(context);
  }
}
