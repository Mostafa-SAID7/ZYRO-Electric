// Open/Closed Principle: Discount strategies can be added without modifying existing code

import { Injectable } from '@angular/core';

export interface IDiscountStrategy {
  getType(): string;
  calculate(subtotal: number): number;
  validate(context: any): boolean;
}

export class PercentageDiscount implements IDiscountStrategy {
  constructor(private percent: number) {}

  getType(): string {
    return 'PERCENTAGE';
  }

  calculate(subtotal: number): number {
    return Math.round(subtotal * (this.percent / 100) * 100) / 100;
  }

  validate(context: any): boolean {
    return this.percent > 0 && this.percent <= 100;
  }
}

export class FixedDiscount implements IDiscountStrategy {
  constructor(private amount: number) {}

  getType(): string {
    return 'FIXED';
  }

  calculate(subtotal: number): number {
    return Math.min(this.amount, subtotal);
  }

  validate(context: any): boolean {
    return this.amount > 0;
  }
}

export class BulkDiscount implements IDiscountStrategy {
  constructor(private minQuantity: number, private discountPercent: number) {}

  getType(): string {
    return 'BULK';
  }

  calculate(subtotal: number): number {
    // Calculate based on context
    return 0;
  }

  validate(context: any): boolean {
    return context?.itemCount >= this.minQuantity;
  }
}

@Injectable({ providedIn: 'root' })
export class DiscountStrategyFactory {
  private strategies = new Map<string, IDiscountStrategy>();

  registerStrategy(type: string, strategy: IDiscountStrategy): void {
    this.strategies.set(type.toUpperCase(), strategy);
  }

  getStrategy(type: string): IDiscountStrategy | undefined {
    return this.strategies.get(type.toUpperCase());
  }

  applyDiscount(strategy: IDiscountStrategy, subtotal: number): number {
    if (!strategy.validate({ subtotal })) {
      return 0;
    }
    return strategy.calculate(subtotal);
  }
}
