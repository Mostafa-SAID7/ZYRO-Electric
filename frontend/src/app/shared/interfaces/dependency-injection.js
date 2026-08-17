// Dependency Inversion: High-level modules depend on abstractions, not low-level details

import { InjectionToken } from '@angular/core';

















// ============ INJECTION TOKENS ============

/**
 * Injection tokens allow swapping implementations without changing code
 * Follows Dependency Inversion Principle
 */

export const PRODUCT_SERVICE_TOKEN = new InjectionToken('ProductService');
export const CART_SERVICE_TOKEN = new InjectionToken('CartService');
export const AUTH_SERVICE_TOKEN = new InjectionToken('AuthService');
export const ORDER_SERVICE_TOKEN = new InjectionToken('OrderService');
export const NOTIFICATION_SERVICE_TOKEN = new InjectionToken('NotificationService');
export const CALCULATION_SERVICE_TOKEN = new InjectionToken('CalculationService');

export const PRODUCT_REPOSITORY_TOKEN = new InjectionToken('ProductRepository');
export const CART_REPOSITORY_TOKEN = new InjectionToken('CartRepository');
export const ORDER_REPOSITORY_TOKEN = new InjectionToken('OrderRepository');

export const PERSISTENCE_SERVICE_TOKEN = new InjectionToken('PersistenceService');

// DIP: Strategy tokens depend on abstractions, not concrete classes
export const SORT_STRATEGY_TOKEN = new InjectionToken('SortStrategy');
export const FILTER_STRATEGY_TOKEN = new InjectionToken('FilterStrategy');

// ============ PROVIDER CONFIGURATION ============

export const SOLID_PROVIDERS = [
  // Services provided through injection tokens
  // This allows swapping implementations per environment
];
