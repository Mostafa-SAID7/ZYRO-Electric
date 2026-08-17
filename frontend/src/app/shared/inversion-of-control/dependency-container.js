














/**
 * Dependency Container (IoC Container)
 * Manages service lifecycle and dependency resolution
 * Follows Dependency Inversion Principle
 */
@Injectable({ providedIn: 'root' })
export class DependencyContainer {constructor() { DependencyContainer.prototype.__init.call(this);DependencyContainer.prototype.__init2.call(this); }
   __init() {this.services = new Map()}
   __init2() {this.singletons = new Map()}

  /**
   * Register a service with its implementation
   */
  register(provide, implementation) {
    this.services.set(provide, {
      provide,
      useClass: implementation
    });
  }

  /**
   * Register a singleton service (same instance everywhere)
   */
  registerSingleton(provide, implementation) {
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
  registerValue(provide, value) {
    this.services.set(provide, {
      provide,
      useValue: value
    });
  }

  /**
   * Register a factory function
   */
  registerFactory(
    provide,
    factory,
    deps
  ) {
    this.services.set(provide, {
      provide,
      useFactory: factory,
      deps: deps || []
    });
  }

  /**
   * Resolve/get a service instance
   */
  resolve(provide) {
    const descriptor = this.services.get(provide);

    if (!descriptor) {
      throw new Error(`Service not registered: ${provide}`);
    }

    // Return singleton if already instantiated
    if ((descriptor ).isSingleton && this.singletons.has(provide)) {
      return this.singletons.get(provide) ;
    }

    let instance;

    const d = descriptor ;
    if (d.useValue !== undefined) {
      instance = d.useValue ;
    } else if (d.useClass) {
      instance = new (d.useClass )();
    } else if (d.useFactory) {
      const deps = d.deps ? d.deps.map(dep => this.resolve(dep )) : [];
      instance = (d.useFactory )(...deps);
    } else {
      throw new Error(`Invalid service descriptor for ${provide}`);
    }

    // Cache singleton
    if ((descriptor ).isSingleton) {
      this.singletons.set(provide, instance);
    }

    return instance;
  }

  /**
   * Clear all registered services
   */
  clear() {
    this.services.clear();
    this.singletons.clear();
  }

  /**
   * Get all registered service tokens
   */
  getRegisteredServices() {
    return Array.from(this.services.keys());
  }
}
