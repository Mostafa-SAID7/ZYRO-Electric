/**
 * Shared test utilities to eliminate duplication in spec files
 * Provides common setup patterns and mock data generators
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

/**
 * Common component test setup
 * Reduces duplication in beforeEach blocks
 */
export function setupComponentTest<T>(
  componentType: any,
  imports: any[],
  declarations?: any[]
) {
  return async () => {
    await TestBed.configureTestingModule({
      declarations: declarations || [componentType],
      imports,
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    const fixture = TestBed.createComponent(componentType);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component };
  };
}

/**
 * Mock hero slide factory
 */
export function createMockHeroSlide(index: number) {
  return {
    badge: index.toString(),
    badgeIcon: 'zap',
    badgeBg: '',
    badgeBorder: '',
    badgeText: '',
    titlePrefix: `Slide ${index}`,
    titleHighlight: '',
    titleSuffix: '',
    description: `Sub ${index}`,
    ctaPrimary: `Go ${index}`,
    ctaSecondary: '',
    image: `img${index}.jpg`,
    bgGradient: '',
    accentColor: '',
    tags: []
  };
}

/**
 * Create array of mock hero slides
 */
export function createMockHeroSlides(count: number) {
  return Array.from({ length: count }, (_, i) => createMockHeroSlide(i + 1));
}

/**
 * Common form validation test helper
 */
export function testFieldInvalid(
  component: any,
  fieldName: string,
  form: any,
  validator: (component: any, fieldName: string) => boolean
) {
  form.get(fieldName)?.markAsTouched();
  form.get(fieldName)?.markAsDirty();
  expect(validator(component, fieldName)).toBeTrue();
}

/**
 * Common error handling test pattern
 */
export function testNotFoundError(
  resource: string,
  findFn: (id: string) => any,
  errorHandler: (error: any) => void
) {
  const resource$ = findFn('nonexistent-id');
  resource$.subscribe({
    error: (error) => {
      errorHandler(error);
      expect(error.message).toContain(`${resource} not found`);
    }
  });
}

/**
 * Mock product factory
 */
export function createMockProduct(id = 'p1', overrides = {}) {
  return {
    id,
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    category: 'electronics',
    stock: 10,
    image: 'test.jpg',
    rating: { average: 4, count: 10 },
    ...overrides
  };
}

/**
 * Mock cart item factory
 */
export function createMockCartItem(productId = 'p1', quantity = 1) {
  return {
    productId,
    quantity,
    price: 100,
    addedAt: new Date()
  };
}

/**
 * Setup localStorage mock
 */
export function setupLocalStorageMock() {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
}

/**
 * Common notification component setup
 */
export function setupNotificationMock() {
  return {
    type: '',
    title: '',
    message: '',
    show: jasmine.createSpy('show')
  };
}

/**
 * Simple component test factory for basic "should create" tests
 * Used for components with minimal logic (display-only components)
 * 
 * @example
 * describe('MyComponent', () => {
 *   const { beforeEach, createTest } = createBasicComponentTest(
 *     MyComponent,
 *     [SharedModule]
 *   );
 *   
 *   beforeEach(beforeEach);
 *   
 *   it('should create', createTest());
 * });
 */
export function createBasicComponentTest<T>(
  componentType: any,
  imports: any[]
) {
  let component: T;
  let fixture: ComponentFixture<T>;

  return {
    beforeEach: async () => {
      await TestBed.configureTestingModule({
        imports,
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(componentType);
      component = fixture.componentInstance;
      fixture.detectChanges();
    },
    createTest: () => () => {
      expect(component).toBeTruthy();
    }
  };
}
