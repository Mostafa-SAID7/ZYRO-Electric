// Dependency Inversion: High-level modules depend on abstractions, not low-level details

import { InjectionToken } from '@angular/core';
import {
  IProductService,
  ICartService,
  ICheckoutService,
  IAuthenticationService,
  INotificationService,
  ICalculationService
} from './business-logic';
import {
  IReadRepository,
  IProductRepository,
  ICartReadRepository,
  IOrderRepository
} from './repositories';
import { PersistenceService } from '../services/persistence.service';
import { FilterStrategyService } from '../services/filter-strategy.service';
import { SortStrategyService } from '../services/sort-strategy.service';

// ============ INJECTION TOKENS ============

/**
 * Injection tokens allow swapping implementations without changing code
 * Follows Dependency Inversion Principle
 */

export const PRODUCT_SERVICE_TOKEN = new InjectionToken<IProductService>('ProductService');
export const CART_SERVICE_TOKEN = new InjectionToken<ICartService>('CartService');
export const CHECKOUT_SERVICE_TOKEN = new InjectionToken<ICheckoutService>('CheckoutService');
export const AUTH_SERVICE_TOKEN = new InjectionToken<IAuthenticationService>('AuthService');
export const NOTIFICATION_SERVICE_TOKEN = new InjectionToken<INotificationService>('NotificationService');
export const CALCULATION_SERVICE_TOKEN = new InjectionToken<ICalculationService>('CalculationService');

export const PRODUCT_REPOSITORY_TOKEN = new InjectionToken<IProductRepository>('ProductRepository');
export const CART_REPOSITORY_TOKEN = new InjectionToken<ICartReadRepository>('CartRepository');
export const ORDER_REPOSITORY_TOKEN = new InjectionToken<IOrderRepository>('OrderRepository');

export const PERSISTENCE_SERVICE_TOKEN = new InjectionToken<PersistenceService>('PersistenceService');
export const FILTER_STRATEGY_TOKEN = new InjectionToken<FilterStrategyService>('FilterStrategy');
export const SORT_STRATEGY_TOKEN = new InjectionToken<SortStrategyService>('SortStrategy');

// ============ PROVIDER CONFIGURATION ============

export const SOLID_PROVIDERS = [
  // Services provided through injection tokens
  // This allows swapping implementations per environment
];
