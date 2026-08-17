 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { inject } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { StorageService } from './storage.service';
import { CookieService } from './cookie.service';

/**
 * Session Configuration
 */

















/**
 * Session Management Service
 * Handles:
 * - Session tracking and timeout
 * - Session restoration
 * - Activity monitoring
 * - Session warnings
 * - Multi-tab synchronization
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
   __init() {this.storageService = inject(StorageService)}
   __init2() {this.cookieService = inject(CookieService)}

   __init3() {this.sessionStateSubject = new BehaviorSubject({
    isActive: false,
    lastActivity: Date.now(),
    sessionId: this.generateSessionId(),
    expiresAt: null,
    remainingTime: 0
  })}

   __init4() {this.sessionState$ = this.sessionStateSubject.asObservable()}

   __init5() {this.config = {
    timeout: 30 * 60 * 1000, // 30 minutes
    warningTime: 5 * 60 * 1000, // 5 minutes before timeout
    rememberMe: false
  }}

   __init6() {this.activityTimeout = null}
   __init7() {this.checkInterval = null}
   __init8() {this.unloadListener = null}

  constructor() {;SessionService.prototype.__init.call(this);SessionService.prototype.__init2.call(this);SessionService.prototype.__init3.call(this);SessionService.prototype.__init4.call(this);SessionService.prototype.__init5.call(this);SessionService.prototype.__init6.call(this);SessionService.prototype.__init7.call(this);SessionService.prototype.__init8.call(this);
    this.initializeSession();
    this.setupActivityMonitoring();
    this.startSessionCheck();
  }

  /**
   * Create/restore session
   */
   initializeSession() {
    const storedSession = this.storageService.get(
      'session_metadata',
      'sessionStorage'
    );

    const sessionId = _optionalChain([storedSession, 'optionalAccess', _ => _.sessionId]) || this.generateSessionId();
    const expiresAt = Date.now() + this.config.timeout;

    // Store session metadata
    this.storageService.set(
      'session_metadata',
      { sessionId, timestamp: Date.now() },
      'sessionStorage'
    );

    // Set session cookie
    this.cookieService.setSessionID(sessionId);

    // Update state
    this.sessionStateSubject.next({
      isActive: true,
      lastActivity: Date.now(),
      sessionId,
      expiresAt,
      remainingTime: this.config.timeout
    });
  }

  /**
   * Monitor user activity and reset timeout
   */
   setupActivityMonitoring() {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    const handleActivity = () => {
      if (this.isSessionActive()) {
        this.recordActivity();
        this.resetTimeout();
      }
    };

    // Add listeners for all activity events
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Store unload listener for cleanup
    this.unloadListener = () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };

    window.addEventListener('beforeunload', this.unloadListener);
  }

  /**
   * Periodically check session status and sync across tabs
   */
   startSessionCheck() {
    this.checkInterval = setInterval(() => {
      this.checkSessionExpiration();
      this.syncSessionAcrossTabs();
    }, 10000); // Check every 10 seconds
  }

  /**
   * Record user activity timestamp
   */
   recordActivity() {
    const state = this.sessionStateSubject.value;
    const updatedState = {
      ...state,
      lastActivity: Date.now(),
      expiresAt: Date.now() + this.config.timeout,
      remainingTime: this.config.timeout
    };

    this.sessionStateSubject.next(updatedState);
    this.storageService.set('session_metadata', 
      { sessionId: state.sessionId, timestamp: Date.now() },
      'sessionStorage'
    );
  }

  /**
   * Reset session timeout
   */
   resetTimeout() {
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout);
    }

    const state = this.sessionStateSubject.value;
    const expiresAt = Date.now() + this.config.timeout;

    this.activityTimeout = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.config.timeout);

    // Update remaining time every second
    const updateInterval = setInterval(() => {
      const currentState = this.sessionStateSubject.value;
      if (!currentState.isActive) {
        clearInterval(updateInterval);
        return;
      }

      const remaining = Math.max(0, expiresAt - Date.now());
      this.sessionStateSubject.next({
        ...currentState,
        remainingTime: remaining
      });
    }, 1000);
  }

  /**
   * Check if session has expired
   */
   checkSessionExpiration() {
    const state = this.sessionStateSubject.value;

    if (!state.isActive || !state.expiresAt) return;

    const remaining = state.expiresAt - Date.now();

    if (remaining <= 0) {
      this.handleSessionTimeout();
    } else if (remaining <= this.config.warningTime) {
      // Emit warning event (emit to 0 subjects would go here)
      console.warn('Session expiring soon. Time remaining:', remaining);
    }
  }

  /**
   * Synchronize session state across browser tabs
   */
   syncSessionAcrossTabs() {
    // Use storage events to detect changes from other tabs
    const storageEvent = new StorageEvent('storage', {
      key: 'session_metadata',
      storageArea: sessionStorage
    });

    window.dispatchEvent(storageEvent);
  }

  /**
   * Handle session timeout
   */
   handleSessionTimeout() {
    console.log('Session timeout - user inactive');
    this.destroySession();
    // Trigger logout in auth service
  }

  /**
   * Check if session is active
   */
  isSessionActive() {
    return this.sessionStateSubject.value.isActive;
  }

  /**
   * Get current session state
   */
  getSessionState() {
    return this.sessionStateSubject.value;
  }

  /**
   * Get remaining session time in milliseconds
   */
  getRemainingTime() {
    const state = this.sessionStateSubject.value;
    if (!state.expiresAt) return 0;
    return Math.max(0, state.expiresAt - Date.now());
  }

  /**
   * Extend session (manual extend for critical operations)
   */
  extendSession(additionalTime = this.config.timeout) {
    const state = this.sessionStateSubject.value;
    const newExpiresAt = Date.now() + additionalTime;

    this.sessionStateSubject.next({
      ...state,
      expiresAt: newExpiresAt,
      remainingTime: additionalTime
    });

    this.resetTimeout();
  }

  /**
   * Destroy session (logout)
   */
  destroySession() {
    // Clear timers
    if (this.activityTimeout) clearTimeout(this.activityTimeout);
    if (this.checkInterval) clearInterval(this.checkInterval);

    // Remove activity listeners
    if (this.unloadListener) {
      window.removeEventListener('beforeunload', this.unloadListener);
    }

    // Clear storage and cookies
    this.storageService.clear('sessionStorage');
    this.cookieService.delete('SESSIONID');

    // Update state
    this.sessionStateSubject.next({
      isActive: false,
      lastActivity: Date.now(),
      sessionId: '',
      expiresAt: null,
      remainingTime: 0
    });
  }

  /**
   * Configure session
   */
  configure(config) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Generate unique session ID
   */
   generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 32) + '_' + Date.now();
  }

  ngOnDestroy() {
    this.destroySession();
  }
}
