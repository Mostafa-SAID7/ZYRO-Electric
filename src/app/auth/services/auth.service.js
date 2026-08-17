 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { inject } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, map, delay } from 'rxjs/operators';

















import { StorageService } from '../../shared/services/storage.service';
import { CookieService } from '../../shared/services/cookie.service';
import { CacheService } from '../../shared/services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   __init() {this.storageService = inject(StorageService)}
   __init2() {this.cookieService = inject(CookieService)}
   __init3() {this.cacheService = inject(CacheService)}

  // State Management
   __init4() {this.authStateSubject = new BehaviorSubject({
    user: _optionalChain([this, 'access', _7 => _7.loadFromStorage, 'call', _8 => _8(), 'optionalAccess', _9 => _9.user]) || null,
    isAuthenticated: !!this.loadFromStorage(),
    isLoading: false,
    error: null,
    token: _optionalChain([this, 'access', _10 => _10.loadFromStorage, 'call', _11 => _11(), 'optionalAccess', _12 => _12.token]) || null
  })}

   __init5() {this.authState$ = this.authStateSubject.asObservable()}
   __init6() {this.isAuthenticated$ = this.authState$.pipe(map(state => state.isAuthenticated))}
   __init7() {this.currentUser$ = this.authState$.pipe(map(state => state.user))}
   __init8() {this.isLoading$ = this.authState$.pipe(map(state => state.isLoading))}

  // Session Management
   __init9() {this.sessionsSubject = new BehaviorSubject([])}
   __init10() {this.sessions$ = this.sessionsSubject.asObservable()}

  // Two-Factor Authentication
   __init11() {this.twoFactorEnabledSubject = new BehaviorSubject(false)}
   __init12() {this.twoFactorEnabled$ = this.twoFactorEnabledSubject.asObservable()}

  // Storage configuration
    __init13() {this.AUTH_TOKEN_KEY = 'auth_token'}
    __init14() {this.AUTH_USER_KEY = 'auth_user'}
    __init15() {this.CSRF_TOKEN_KEY = 'csrf_token'}
    __init16() {this.SESSION_ID_KEY = 'session_id'}
    __init17() {this.TOKEN_CACHE_TTL = 60 * 60 * 1000} // 1 hour
    __init18() {this.CSRF_CACHE_TTL = 24 * 60 * 60 * 1000} // 24 hours

  constructor() {;AuthService.prototype.__init.call(this);AuthService.prototype.__init2.call(this);AuthService.prototype.__init3.call(this);AuthService.prototype.__init4.call(this);AuthService.prototype.__init5.call(this);AuthService.prototype.__init6.call(this);AuthService.prototype.__init7.call(this);AuthService.prototype.__init8.call(this);AuthService.prototype.__init9.call(this);AuthService.prototype.__init10.call(this);AuthService.prototype.__init11.call(this);AuthService.prototype.__init12.call(this);AuthService.prototype.__init13.call(this);AuthService.prototype.__init14.call(this);AuthService.prototype.__init15.call(this);AuthService.prototype.__init16.call(this);AuthService.prototype.__init17.call(this);AuthService.prototype.__init18.call(this);
    this.initializeAuth();
  }

  // ============ Authentication ============

  login(credentials, rememberMe = false) {
    this.setLoading(true);
    return of({
      user: this.createMockUser(credentials.email),
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
      expiresIn: 3600
    }).pipe(
      delay(500),
      tap(response => {
        this.setUser(response.user, response.token, rememberMe);
        this.setLoading(false);
      }),
      catchError(error => {
        this.setError('Login failed. Please try again.');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  register(data) {
    if (data.password !== data.confirmPassword) {
      return throwError(() => new Error('Passwords do not match'));
    }

    this.setLoading(true);
    return of({
      user: this.createMockUser(data.email, data.name),
      token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
      expiresIn: 3600
    }).pipe(
      delay(500),
      tap(response => {
        this.setUser(response.user, response.token, false);
        this.setLoading(false);
      }),
      catchError(error => {
        this.setError('Registration failed. Please try again.');
        this.setLoading(false);
        return throwError(() => error);
      })
    );
  }

  logout() {
    return of(void 0).pipe(
      delay(300),
      tap(() => {
        this.clearAuth();
      })
    );
  }

  // ============ Password Management ============

  changePassword(request) {
    if (request.newPassword !== request.confirmPassword) {
      return throwError(() => new Error('Passwords do not match'));
    }

    return of({ message: 'Password changed successfully' }).pipe(
      delay(500),
      tap(() => this.setSuccess('Password updated successfully'))
    );
  }

  requestPasswordReset(request) {
    return of({ message: 'Reset link sent to email' }).pipe(
      delay(500),
      tap(() => this.setSuccess('Password reset link sent to ' + request.email))
    );
  }

  confirmPasswordReset(request) {
    if (request.newPassword !== request.confirmPassword) {
      return throwError(() => new Error('Passwords do not match'));
    }

    return of({ message: 'Password reset successfully' }).pipe(
      delay(500),
      tap(() => this.setSuccess('Password reset successfully'))
    );
  }

  // ============ Email Verification ============

  requestEmailVerification(_request) {
    void _request;
    return of({ message: 'Verification code sent to email' }).pipe(
      delay(500),
      tap(() => this.setSuccess('Verification code sent'))
    );
  }

  confirmEmailVerification(_request) {
    void _request;
    return of({ message: 'Email verified successfully' }).pipe(
      delay(500),
      tap(() => {
        const user = this.authStateSubject.value.user;
        if (user) {
          user.isEmailVerified = true;
          this.setUser(user, this.authStateSubject.value.token);
        }
        this.setSuccess('Email verified successfully');
      })
    );
  }

  // ============ Two-Factor Authentication ============

  setupTwoFactor() {
    const setup = {
      secret: 'JBSWY3DPEBLW64TMMQ======',
      qrCode: 'data:image/png;base64,...'
    };

    return of(setup).pipe(delay(500));
  }

  enableTwoFactor(_verify) {
    void _verify;
    const backupCodes = Array.from({ length: 10 }, () =>
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );

    return of({ message: '2FA enabled successfully', backupCodes }).pipe(
      delay(500),
      tap(() => {
        this.twoFactorEnabledSubject.next(true);
        this.setSuccess('Two-factor authentication enabled');
      })
    );
  }

  disableTwoFactor(_password) {
    void _password;
    return of({ message: '2FA disabled successfully' }).pipe(
      delay(500),
      tap(() => {
        this.twoFactorEnabledSubject.next(false);
        this.setSuccess('Two-factor authentication disabled');
      })
    );
  }

  // ============ User Profile ============

  getUserProfile() {
    const user = this.authStateSubject.value.user;
    if (!user) {
      return throwError(() => new Error('Not authenticated'));
    }

    const profile = {
      ...user,
      preferences: {
        newsletter: true,
        notifications: true,
        twoFactorEnabled: false,
        theme: 'dark'
      },
      addresses: [
        {
          id: '1',
          type: 'home',
          street: '123 Main St',
          city: 'City',
          state: 'State',
          zipCode: '12345',
          country: 'Country',
          isDefault: true
        }
      ]
    };

    return of(profile).pipe(delay(300));
  }

  updateUserProfile(profile) {
    const user = this.authStateSubject.value.user;
    if (!user) {
      return throwError(() => new Error('Not authenticated'));
    }

    const updated = { ...user, ...profile };
    this.setUser(updated, this.authStateSubject.value.token);
    return of(updated ).pipe(delay(500));
  }

  addAddress(address) {
    const newAddress = {
      ...address,
      id: Math.random().toString(36).substr(2, 9)
    };
    return of(newAddress).pipe(delay(300));
  }

  removeAddress(_addressId) {
    void _addressId;
    return of({ message: 'Address removed' }).pipe(delay(300));
  }

  // ============ Session Management ============

  getSessions() {
    return this.sessions$.pipe(
      map(sessions => sessions.length > 0 ? sessions : [this.createMockSession()])
    );
  }

  revokeSession(sessionId) {
    const sessions = this.sessionsSubject.value.filter(s => s.id !== sessionId);
    this.sessionsSubject.next(sessions);
    return of({ message: 'Session revoked' }).pipe(delay(300));
  }

  revokeAllSessions() {
    this.sessionsSubject.next([]);
    return of({ message: 'All sessions revoked' }).pipe(delay(300));
  }

  // ============ State Management ============

  getCurrentUser() {
    return this.authStateSubject.value.user;
  }

  isAuthenticated() {
    // Check both in-memory state and storage for robustness
    const stateIsAuth = this.authStateSubject.value.isAuthenticated;
    const storageData = this.loadFromStorage();
    const storageIsAuth = !!_optionalChain([storageData, 'optionalAccess', _13 => _13.token]) && !!_optionalChain([storageData, 'optionalAccess', _14 => _14.user]);
    
    const result = stateIsAuth || storageIsAuth;
    
    if (!result && (stateIsAuth || storageIsAuth)) {
      // If one says authenticated but other doesn't, sync them
      if (storageIsAuth && !stateIsAuth) {
        console.warn('[AuthService] Storage has auth data but state does not - syncing state');
        this.authStateSubject.next({
          user: _optionalChain([storageData, 'optionalAccess', _15 => _15.user]) || null,
          isAuthenticated: true,
          isLoading: false,
          error: null,
          token: _optionalChain([storageData, 'optionalAccess', _16 => _16.token]) || null
        });
        return true;
      }
    }
    
    return result;
  }

  getAuthToken() {
    return this.authStateSubject.value.token;
  }

  // ============ Private Methods ============

   initializeAuth() {
    const stored = this.loadFromStorage();
    if (stored) {
      this.authStateSubject.next({
        user: stored.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        token: stored.token
      });
    }
  }

  /**
   * Set authenticated user with token
   * Handles Remember Me functionality - determines storage type
   */
   setUser(user, token, rememberMe = false) {
    const state = this.authStateSubject.value;
    this.authStateSubject.next({
      ...state,
      user,
      isAuthenticated: true,
      token,
      error: null
    });

    // Store based on rememberMe flag
    const storageType = rememberMe ? 'localStorage' : 'sessionStorage';
    
    this.storageService.set(this.AUTH_TOKEN_KEY, token, storageType, 24 * 60 * 60 * 1000);
    this.storageService.set(this.AUTH_USER_KEY, user, storageType, 24 * 60 * 60 * 1000);
    
    // Set CSRF token cookie for server communication
    const csrfToken = 'csrf_' + Math.random().toString(36).substr(2, 9);
    this.cookieService.setCSRFToken(csrfToken);
    this.cacheService.set(this.CSRF_TOKEN_KEY, csrfToken, this.CSRF_CACHE_TTL);
    
    // Set session ID cookie
    const sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
    this.cookieService.set(this.SESSION_ID_KEY, sessionId, {
      expires: 1, // 1 day
      secure: true,
      sameSite: 'Lax',
      path: '/'
    });
  }

   setLoading(isLoading) {
    const state = this.authStateSubject.value;
    this.authStateSubject.next({ ...state, isLoading });
  }

   setError(error) {
    const state = this.authStateSubject.value;
    this.authStateSubject.next({ ...state, error });
  }

   setSuccess(_message) {
    void _message;
    const state = this.authStateSubject.value;
    this.authStateSubject.next({ ...state, error: null });
  }

  /**
   * Clear all auth data from storage and cache
   * Called on logout
   */
   clearAuth() {
    this.authStateSubject.next({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null
    });

    // Clear from both storage types
    this.storageService.remove(this.AUTH_TOKEN_KEY, 'localStorage');
    this.storageService.remove(this.AUTH_USER_KEY, 'localStorage');
    this.storageService.remove(this.AUTH_TOKEN_KEY, 'sessionStorage');
    this.storageService.remove(this.AUTH_USER_KEY, 'sessionStorage');
    
    // Clear cache
    this.cacheService.invalidate('auth:*');
    this.cacheService.invalidate('user:*');
    
    this.sessionsSubject.next([]);
  }

  /**
   * Load auth data from storage (checks both localStorage and sessionStorage)
   */
   loadFromStorage() {
    try {
      // Try localStorage first (Remember Me)
      let token = this.storageService.get(this.AUTH_TOKEN_KEY, 'localStorage');
      let user = this.storageService.get(this.AUTH_USER_KEY, 'localStorage');
      
      // Fall back to sessionStorage
      if (!token) {
        token = this.storageService.get(this.AUTH_TOKEN_KEY, 'sessionStorage');
      }
      if (!user) {
        user = this.storageService.get(this.AUTH_USER_KEY, 'sessionStorage');
      }
      
      return (token && user) ? { token, user } : null;
    } catch (error) {
      console.error('Error loading auth from storage:', error);
      return null;
    }
  }

   createMockUser(email, name) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split('@')[0],
      phone: '+1234567890',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date(),
      isEmailVerified: false,
      isPhoneVerified: false,
      role: 'customer',
      status: 'active'
    };
  }

   createMockSession() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      userId: _optionalChain([this, 'access', _17 => _17.authStateSubject, 'access', _18 => _18.value, 'access', _19 => _19.user, 'optionalAccess', _20 => _20.id]) || '',
      token: this.authStateSubject.value.token || '',
      refreshToken: 'refresh_token_mock',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      userAgent: navigator.userAgent,
      ipAddress: '192.168.1.1',
      isActive: true
    };
  }
}
