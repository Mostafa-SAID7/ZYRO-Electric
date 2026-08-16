// Dependency Inversion: Service Locator pattern for managing dependencies
// Allows components to request dependencies without tight coupling

import { Injector, inject } from '@angular/core';

/**
 * Service Locator
 * Provides a centralized way to access services via Angular's Injector
 * Implements Service Locator pattern for Dependency Inversion
 */
@Injectable({ providedIn: 'root' })
export class ServiceLocator {
  
   __init() {this.injector = inject(Injector)}

  constructor() {;ServiceLocator.prototype.__init.call(this);
    ServiceLocator.instance = this;
  }

  static getInstance() {
    return ServiceLocator.instance;
  }

  /**
   * Get any service by token/class using Angular's Injector
   * Decouples component from direct service dependencies
   */
  getService(serviceToken) {
    try {
      return this.injector.get(serviceToken ) ;
    } catch (error) {
      console.error(`Service not found for token:`, serviceToken);
      throw error;
    }
  }

  /**
   * Get optional service - returns null if not found
   */
  getOptionalService(serviceToken) {
    try {
      return this.injector.get(serviceToken , null) ;
    } catch (e) {
      return null;
    }
  }

  /**
   * Check if service is registered
   */
  hasService(serviceToken) {
    try {
      this.injector.get(serviceToken );
      return true;
    } catch (e2) {
      return false;
    }
  }
}
