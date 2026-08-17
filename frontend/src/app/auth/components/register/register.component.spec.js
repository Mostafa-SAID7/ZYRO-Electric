 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component;
  let fixture;
  let authServiceSpy;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'products', redirectTo: '' }])],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.toast = jasmine.createSpyObj('UiToastComponent', ['show']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should create registerForm with all required fields', () => {
      expect(component.registerForm.get('name')).not.toBeNull();
      expect(component.registerForm.get('email')).not.toBeNull();
      expect(component.registerForm.get('phone')).not.toBeNull();
      expect(component.registerForm.get('address')).not.toBeNull();
      expect(component.registerForm.get('password')).not.toBeNull();
      expect(component.registerForm.get('confirmPassword')).not.toBeNull();
      expect(component.registerForm.get('terms')).not.toBeNull();
    });

    it('should be invalid when empty', () => {
      expect(component.registerForm.valid).toBeFalse();
    });

    it('should require minimum 8 characters for password', () => {
      component.registerForm.patchValue({ password: 'short' });
      expect(_optionalChain([component, 'access', _ => _.registerForm, 'access', _2 => _2.get, 'call', _3 => _3('password'), 'optionalAccess', _4 => _4.valid])).toBeFalse();
    });

    it('should accept password with 8+ characters', () => {
      component.registerForm.patchValue({ password: 'longpassword' });
      expect(_optionalChain([component, 'access', _5 => _5.registerForm, 'access', _6 => _6.get, 'call', _7 => _7('password'), 'optionalAccess', _8 => _8.valid])).toBeTrue();
    });

    it('should require terms to be accepted', () => {
      component.registerForm.patchValue({ terms: false });
      expect(_optionalChain([component, 'access', _9 => _9.registerForm, 'access', _10 => _10.get, 'call', _11 => _11('terms'), 'optionalAccess', _12 => _12.valid])).toBeFalse();
    });
  });

  describe('passwordMatchValidator()', () => {
    it('should return passwordMismatch error when passwords differ', () => {
      component.registerForm.patchValue({
        password: 'password1',
        confirmPassword: 'password2'
      });
      expect(_optionalChain([component, 'access', _13 => _13.registerForm, 'access', _14 => _14.errors, 'optionalAccess', _15 => _15['passwordMismatch']])).toBeTrue();
    });

    it('should return null when passwords match', () => {
      component.registerForm.patchValue({
        password: 'password1',
        confirmPassword: 'password1'
      });
      expect(_optionalChain([component, 'access', _16 => _16.registerForm, 'access', _17 => _17.errors, 'optionalAccess', _18 => _18['passwordMismatch']])).toBeFalsy();
    });
  });

  describe('isFieldInvalid()', () => {
    it('should return false for pristine field', () => {
      expect(component.isFieldInvalid('name')).toBeFalse();
    });

    it('should return true for touched empty required field', () => {
      component.registerForm.get('name').markAsTouched();
      expect(component.isFieldInvalid('name')).toBeTrue();
    });

    it('should return false for valid touched field', () => {
      component.registerForm.patchValue({ name: 'Mostafa Said' });
      component.registerForm.get('name').markAsTouched();
      expect(component.isFieldInvalid('name')).toBeFalse();
    });
  });

  describe('onSubmit()', () => {
    it('should NOT call authService.register when form is invalid', () => {
      component.onSubmit();
      expect(authServiceSpy.register).not.toHaveBeenCalled();
    });

    it('should call authService.register with form values when valid', () => {
      authServiceSpy.register.and.returnValue(of({ user: {} , token: 'tok', expiresIn: 3600 }));
      component.registerForm.patchValue({
        name: 'Mostafa Said',
        email: 'mostafa@zyro.com',
        phone: '+1234567890',
        address: '123 ZYRO St',
        password: 'password123',
        confirmPassword: 'password123',
        terms: true
      });
      component.onSubmit();
      expect(authServiceSpy.register).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'mostafa@zyro.com' }));
    });

    it('should set isLoading to false on success', fakeAsync(() => {
      authServiceSpy.register.and.returnValue(of({ user: {} , token: 'tok', expiresIn: 3600 }));
      component.registerForm.patchValue({
        name: 'Test', email: 'a@b.com', phone: '123',
        address: 'addr', password: 'password1', confirmPassword: 'password1', terms: true
      });
      component.onSubmit();
      tick(2000);
      expect(component.isLoading).toBeFalse();
    }));

    it('should set isLoading to false on error', fakeAsync(() => {
      authServiceSpy.register.and.returnValue(throwError(() => new Error('fail')));
      component.registerForm.patchValue({
        name: 'Test', email: 'a@b.com', phone: '123',
        address: 'addr', password: 'password1', confirmPassword: 'password1', terms: true
      });
      component.onSubmit();
      tick(2000);
      expect(component.isLoading).toBeFalse();
    }));
  });
});
