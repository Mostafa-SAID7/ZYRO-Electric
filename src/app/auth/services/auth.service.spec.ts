import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuthenticated()', () => {
    it('should return false by default (no stored session)', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should return true after successful login', fakeAsync(() => {
      service.login({ email: 'test@zyro.com', password: 'pass123' }).subscribe();
      tick(600);
      expect(service.isAuthenticated()).toBeTrue();
    }));
  });

  describe('login()', () => {
    it('should return an AuthResponse with user and token', fakeAsync(() => {
      let result: any;
      service.login({ email: 'user@zyro.com', password: 'pass' }).subscribe(r => result = r);
      tick(600);
      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('user@zyro.com');
    }));

    it('should set isAuthenticated to true after login', fakeAsync(() => {
      service.login({ email: 'a@b.com', password: 'x' }).subscribe();
      tick(600);
      expect(service.isAuthenticated()).toBeTrue();
    }));

    it('should persist auth to localStorage', fakeAsync(() => {
      service.login({ email: 'a@b.com', password: 'x' }).subscribe();
      tick(600);
      expect(localStorage.getItem('authData')).not.toBeNull();
    }));
  });

  describe('register()', () => {
    it('should throw error when passwords do not match', () => {
      let error: any;
      service.register({
        email: 'a@b.com', password: '123', confirmPassword: '456', name: 'Test',
        phone: '',
        address: '',
        agreeToTerms: false
      })
        .subscribe({ error: e => error = e });
      expect(error.message).toBe('Passwords do not match');
    });

    it('should return user with provided name on success', fakeAsync(() => {
      let result: any;
      service.register({
        email: 'new@zyro.com', password: 'abc', confirmPassword: 'abc', name: 'Mostafa',
        phone: '',
        address: '',
        agreeToTerms: false
      })
        .subscribe(r => result = r);
      tick(600);
      expect(result.user.name).toBe('Mostafa');
      expect(result.user.email).toBe('new@zyro.com');
    }));
  });

  describe('logout()', () => {
    it('should clear authentication state after logout', fakeAsync(() => {
      service.login({ email: 'a@b.com', password: 'x' }).subscribe();
      tick(600);
      service.logout().subscribe();
      tick(400);
      expect(service.isAuthenticated()).toBeFalse();
    }));

    it('should remove authData from localStorage', fakeAsync(() => {
      service.login({ email: 'a@b.com', password: 'x' }).subscribe();
      tick(600);
      service.logout().subscribe();
      tick(400);
      expect(localStorage.getItem('authData')).toBeNull();
    }));
  });

  describe('getCurrentUser()', () => {
    it('should return null when not authenticated', () => {
      expect(service.getCurrentUser()).toBeNull();
    });

    it('should return user after login', fakeAsync(() => {
      service.login({ email: 'u@zyro.com', password: 'p' }).subscribe();
      tick(600);
      expect(service.getCurrentUser()).not.toBeNull();
      expect(service.getCurrentUser()!.email).toBe('u@zyro.com');
    }));
  });

  describe('getAuthToken()', () => {
    it('should return null when not authenticated', () => {
      expect(service.getAuthToken()).toBeNull();
    });

    it('should return a token string after login', fakeAsync(() => {
      service.login({ email: 'u@zyro.com', password: 'p' }).subscribe();
      tick(600);
      expect(service.getAuthToken()).toContain('mock_token_');
    }));
  });

  describe('changePassword()', () => {
    it('should throw error when passwords do not match', () => {
      let error: any;
      service.changePassword({ currentPassword: 'old', newPassword: 'new1', confirmPassword: 'new2' })
        .subscribe({ error: e => error = e });
      expect(error.message).toBe('Passwords do not match');
    });

    it('should return success message when passwords match', fakeAsync(() => {
      let result: any;
      service.changePassword({ currentPassword: 'old', newPassword: 'new1', confirmPassword: 'new1' })
        .subscribe(r => result = r);
      tick(600);
      expect(result.message).toBe('Password changed successfully');
    }));
  });

  describe('requestPasswordReset()', () => {
    it('should return a message about sending reset link', fakeAsync(() => {
      let result: any;
      service.requestPasswordReset({ email: 'test@zyro.com' }).subscribe(r => result = r);
      tick(600);
      expect(result.message).toBeDefined();
    }));
  });

  describe('getUserProfile()', () => {
    it('should throw error if not authenticated', () => {
      let error: any;
      service.getUserProfile().subscribe({ error: e => error = e });
      expect(error.message).toBe('Not authenticated');
    });

    it('should return profile with addresses after login', fakeAsync(() => {
      service.login({ email: 'u@zyro.com', password: 'p' }).subscribe();
      tick(600);
      let profile: any;
      service.getUserProfile().subscribe(p => profile = p);
      tick(400);
      expect(profile.addresses).toBeDefined();
      expect(profile.preferences).toBeDefined();
    }));
  });

  describe('authState$', () => {
    it('should emit updated state after login', fakeAsync(() => {
      let states: any[] = [];
      service.authState$.subscribe(s => states.push(s));
      service.login({ email: 'u@zyro.com', password: 'p' }).subscribe();
      tick(600);
      const lastState = states[states.length - 1];
      expect(lastState.isAuthenticated).toBeTrue();
      expect(lastState.user).not.toBeNull();
    }));
  });
});
