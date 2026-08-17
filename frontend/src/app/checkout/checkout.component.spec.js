 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartsService } from '../carts/services/carts.service';
import { AuthService } from '../auth/services/auth.service';
import { OrderService } from '../orders/services/order.service';
import { of } from 'rxjs';

describe('CheckoutComponent', () => {
  let component;
  let fixture;
  let authServiceSpy;
  let orderServiceSpy;
  let cartsServiceSpy;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['createOrder']);
    cartsServiceSpy = jasmine.createSpyObj('CartsService', ['getCartItems', 'clearCart']) ;

    authServiceSpy.getCurrentUser.and.returnValue(null);
    cartsServiceSpy.cartState$ = of([]);

    await TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: CartsService, useValue: cartsServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    // Mock ViewChild refs to prevent null errors
    component.toast = jasmine.createSpyObj('UiToastComponent', ['show']);
    component.confirm = jasmine.createSpyObj('UiConfirmationComponent', ['open']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should create checkout form with required fields', () => {
      expect(component.checkoutForm).toBeDefined();
      expect(component.checkoutForm.get('firstName')).not.toBeNull();
      expect(component.checkoutForm.get('lastName')).not.toBeNull();
      expect(component.checkoutForm.get('streetAddress')).not.toBeNull();
      expect(component.checkoutForm.get('city')).not.toBeNull();
      expect(component.checkoutForm.get('state')).not.toBeNull();
      expect(component.checkoutForm.get('zipCode')).not.toBeNull();
      expect(component.checkoutForm.get('country')).not.toBeNull();
    });

    it('should have paymentMethod defaulted to "card"', () => {
      expect(_optionalChain([component, 'access', _ => _.checkoutForm, 'access', _2 => _2.get, 'call', _3 => _3('paymentMethod'), 'optionalAccess', _4 => _4.value])).toBe('card');
    });

    it('should be invalid when required fields are empty', () => {
      expect(component.checkoutForm.valid).toBeFalse();
    });

    it('should be valid when all required fields are filled', () => {
      component.checkoutForm.setValue({
        firstName: 'Mostafa',
        lastName: 'Said',
        streetAddress: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
        paymentMethod: 'card'
      });
      expect(component.checkoutForm.valid).toBeTrue();
    });
  });

  describe('calculateTotal()', () => {
    it('should calculate subtotal from cartItems', () => {
      component.cartItems = [
        { price: 29.99, quantity: 2 } ,
        { price: 9.99, quantity: 1 } 
      ];
      component.calculateTotal();
      expect(component.subtotal).toBeCloseTo(69.97, 1);
    });

    it('should add 10% tax to get total', () => {
      component.cartItems = [{ price: 100, quantity: 1 } ];
      component.calculateTotal();
      expect(component.total).toBeCloseTo(110, 1);
    });

    it('should return 0 totals for empty cart', () => {
      component.cartItems = [];
      component.calculateTotal();
      expect(component.subtotal).toBe(0);
      expect(component.total).toBe(0);
    });
  });

  describe('populateUserInfo()', () => {
    it('should patch form with user info when user is logged in', () => {
      authServiceSpy.getCurrentUser.and.returnValue({
        name: 'Mostafa Said',
        address: '123 ZYRO St'
      } );
      component.populateUserInfo();
      expect(_optionalChain([component, 'access', _5 => _5.checkoutForm, 'access', _6 => _6.get, 'call', _7 => _7('firstName'), 'optionalAccess', _8 => _8.value])).toBe('Mostafa');
      expect(_optionalChain([component, 'access', _9 => _9.checkoutForm, 'access', _10 => _10.get, 'call', _11 => _11('lastName'), 'optionalAccess', _12 => _12.value])).toBe('Said');
    });

    it('should not patch form when no user is logged in', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);
      component.checkoutForm.reset();
      component.populateUserInfo();
      expect(_optionalChain([component, 'access', _13 => _13.checkoutForm, 'access', _14 => _14.get, 'call', _15 => _15('firstName'), 'optionalAccess', _16 => _16.value])).toBeFalsy();
    });
  });

  describe('onSubmit()', () => {
    it('should not open confirm when form is invalid', () => {
      component.confirm = jasmine.createSpyObj('UiConfirmationComponent', ['open']);
      component.checkoutForm.reset();
      component.onSubmit();
      expect(component.confirm.open).not.toHaveBeenCalled();
    });

    it('should open confirm dialog when form is valid', () => {
      component.confirm = jasmine.createSpyObj('UiConfirmationComponent', ['open']);
      component.checkoutForm.setValue({
        firstName: 'A', lastName: 'B', streetAddress: 'C',
        city: 'D', state: 'E', zipCode: 'F', country: 'G', paymentMethod: 'card'
      });
      component.onSubmit();
      expect(component.confirm.open).toHaveBeenCalled();
    });
  });

  describe('isProcessing', () => {
    it('should start as false', () => {
      expect(component.isProcessing).toBeFalse();
    });
  });
});
