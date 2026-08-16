// Dependency Inversion: Service Locator pattern for managing dependencies
// Allows components to request dependencies without tight coupling

import { Injectable, Injector } from '@angular/core';

/**
 * Service Locator
 * Provides a centralized way to access services
 * Implements Service Locator pattern for Dependency Inversion
 */
@Injectable({ providedIn: 'root' })
export class ServiceLocator {
  private static instance: ServiceLocator;

  constructor(private injector: Injector) {
    ServiceLocator.instance = this;
  }

  static getInstance(): ServiceLocator {
    return ServiceLocator.instance;
  }

  /**
   * Get any service by token/class
   * Decouples component from direct service dependencies
   */
  getService<T>(serviceToken: any): T {
    try {
      return this.injector.get(serviceToken);
    } catch (error) {
      console.error(`Service not found for token:`, serviceToken);
      throw error;
    }
  }

  /**
   * Get optional service - returns null if not found
   */
  getOptionalService<T>(serviceToken: any): T | null {
    try {
      return this.injector.get(serviceToken, null);
    } catch {
      return null;
    }
  }

  /**
   * Check if service is registered
   */
  hasService(serviceToken: any): boolean {
    try {
      this.injector.get(serviceToken);
      return true;
    } catch {
      return false;
    }
  }
}
