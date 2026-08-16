 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Shared test utilities to eliminate duplication in spec files
 * Provides common setup patterns and mock data generators
 */

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';


/**
 * Common component test setup
 * Reduces duplication in beforeEach blocks
 */
export function setupComponentTest(
  componentType,
  imports,
  declarations
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
export function createMockHeroSlide(index) {
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
export function createMockHeroSlides(count) {
  return Array.from({ length: count }, (_, i) => createMockHeroSlide(i + 1));
}

/**
 * Common form validation test helper
 */
export function testFieldInvalid(
  component,
  fieldName,
  form,
  validator
) {
  _optionalChain([form, 'access', _2 => _2.get, 'call', _3 => _3(fieldName), 'optionalAccess', _4 => _4.markAsTouched, 'call', _5 => _5()]);
  _optionalChain([form, 'access', _6 => _6.get, 'call', _7 => _7(fieldName), 'optionalAccess', _8 => _8.markAsDirty, 'call', _9 => _9()]);
  expect(validator(component, fieldName)).toBeTrue();
}

/**
 * Common error handling test pattern
 */
export function testNotFoundError(
  resource,
  findFn,
  errorHandler
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
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value;
    },
    removeItem: (key) => {
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
 *   const { beforeEach: setupTest, createTest, getComponent } = createBasicComponentTest(
 *     MyComponent,
 *     [SharedModule]
 *   );
 *   
 *   beforeEach(setupTest);
 *   
 *   it('should create', createTest());
 * });
 */
export function createBasicComponentTest(
  componentType,
  imports
) {
  let component;
  let fixture;

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
    },
    getComponent: () => component,
    getFixture: () => fixture
  };
}
