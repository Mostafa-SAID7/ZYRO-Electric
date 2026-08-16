// Dependency Inversion: Dependency Container (IoC Container)
// Manages service registration and resolution

import { Injectable, Type, InjectionToken } from '@angular/core';

export type ServiceType<T> = Type<T> | InjectionToken<T>;

interface ServiceDescriptor {
  provide: any;
  useClass?: any;
  useValue?: any;
  useFactory?: (...args: any[]) => any;
  deps?: any[];
}

/**
 * Dependency Container (IoC Container)
 * Manages service lifecycle and dependency resolution
 * Follows Dependency Inversion Principle
 */
@Injectable({ providedIn: 'root' })
export class DependencyContainer {
  private services = new Map<any, any>();
  private singletons = new Map<any, any>();

  /**
   * Register a service with its implementation
   */
  register<T>(provide: ServiceType<T>, implementation: Type<T> | any): void {
    this.services.set(provide, {
      provide,
      useClass: implementation
    });
  }

  /**
   * Register a singleton service (same instance everywhere)
   */
  registerSingleton<T>(provide: ServiceType<T>, implementation: Type<T> | any): void {
    const descriptor = {
      provide,
      useClass: implementation,
      isSingleton: true
    };
    this.services.set(provide, descriptor);
  }

  /**
   * Register a value service (constant)
   */
  registerValue<T>(provide: ServiceType<T>, value: T): void {
    this.services.set(provide, {
      provide,
      useValue: value
    });
  }

  /**
   * Register a factory function
   */
  registerFactory<T>(
    provide: ServiceType<T>,
    factory: (...args: any[]) => T,
    deps?: ServiceType<any>[]
  ): void {
    this.services.set(provide, {
      provide,
      useFactory: factory,
      deps: deps || []
    });
  }

  /**
   * Resolve/get a service instance
   */
  resolve<T>(provide: ServiceType<T>): T {
    const descriptor = this.services.get(provide);

    if (!descriptor) {
      throw new Error(`Service not registered: ${provide}`);
    }

    // Return singleton if already instantiated
    if (descriptor.isSingleton && this.singletons.has(provide)) {
      return this.singletons.get(provide);
    }

    let instance: T;

    if (descriptor.useValue !== undefined) {
      instance = descriptor.useValue;
    } else if (descriptor.useClass) {
      instance = new descriptor.useClass();
    } else if (descriptor.useFactory) {
      const deps = descriptor.deps ? descriptor.deps.map(d => this.resolve(d)) : [];
      instance = descriptor.useFactory(...deps);
    } else {
      throw new Error(`Invalid service descriptor for ${provide}`);
    }

    // Cache singleton
    if (descriptor.isSingleton) {
      this.singletons.set(provide, instance);
    }

    return instance;
  }

  /**
   * Clear all registered services
   */
  clear(): void {
    this.services.clear();
    this.singletons.clear();
  }

  /**
   * Get all registered service tokens
   */
  getRegisteredServices(): any[] {
    return Array.from(this.services.keys());
  }
}
