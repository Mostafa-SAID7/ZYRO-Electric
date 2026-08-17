 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component;
  let fixture;
  let authServiceSpy;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([{ path: 'products', redirectTo: '' }])],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParams: { returnUrl: '/products' } } }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.toast = jasmine.createSpyObj('UiToastComponent', ['show']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should create loginForm with email, password and rememberMe', () => {
      expect(component.loginForm.get('email')).not.toBeNull();
      expect(component.loginForm.get('password')).not.toBeNull();
      expect(component.loginForm.get('rememberMe')).not.toBeNull();
    });

    it('should be invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should be invalid with malformed email', () => {
      component.loginForm.patchValue({ email: 'not-an-email', password: '123' });
      expect(_optionalChain([component, 'access', _ => _.loginForm, 'access', _2 => _2.get, 'call', _3 => _3('email'), 'optionalAccess', _4 => _4.valid])).toBeFalse();
    });

    it('should be valid with correct email and password', () => {
      component.loginForm.patchValue({ email: 'user@zyro.com', password: 'pass123' });
      expect(component.loginForm.valid).toBeTrue();
    });

    it('rememberMe should default to false', () => {
      expect(_optionalChain([component, 'access', _5 => _5.loginForm, 'access', _6 => _6.get, 'call', _7 => _7('rememberMe'), 'optionalAccess', _8 => _8.value])).toBeFalse();
    });
  });

  describe('isFieldInvalid()', () => {
    it('should return false for pristine field', () => {
      expect(component.isFieldInvalid('email')).toBeFalse();
    });

    it('should return true for touched invalid field', () => {
      const emailField = component.loginForm.get('email');
      emailField.markAsTouched();
      expect(component.isFieldInvalid('email')).toBeTrue();
    });

    it('should return false for valid touched field', () => {
      component.loginForm.patchValue({ email: 'valid@test.com' });
      component.loginForm.get('email').markAsTouched();
      expect(component.isFieldInvalid('email')).toBeFalse();
    });
  });

  describe('onSubmit()', () => {
    it('should NOT call authService.login when form is invalid', () => {
      component.onSubmit();
      expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('should call authService.login with form values when valid', () => {
      authServiceSpy.login.and.returnValue(of({ user: {} , token: 'tok', expiresIn: 3600 }));
      component.loginForm.patchValue({ email: 'a@b.com', password: 'pass' });
      component.onSubmit();
      expect(authServiceSpy.login).toHaveBeenCalledWith(jasmine.objectContaining({ email: 'a@b.com' }));
    });

    it('should set isLoading to false on success', fakeAsync(() => {
      authServiceSpy.login.and.returnValue(of({ user: {} , token: 'tok', expiresIn: 3600 }));
      component.loginForm.patchValue({ email: 'a@b.com', password: 'pass' });
      component.onSubmit();
      tick(2000);
      expect(component.isLoading).toBeFalse();
    }));

    it('should set isLoading to false on error', fakeAsync(() => {
      authServiceSpy.login.and.returnValue(throwError(() => new Error('fail')));
      component.loginForm.patchValue({ email: 'a@b.com', password: 'pass' });
      component.onSubmit();
      tick(2000);
      expect(component.isLoading).toBeFalse();
    }));
  });
});
