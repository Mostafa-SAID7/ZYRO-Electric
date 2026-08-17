 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


// Single Responsibility: Handle 2FA operations only
@Injectable({ providedIn: 'root' })
export class TwoFactorAuthService {
   __init() {this.twoFactorStates = new Map()}
    __init2() {this.TOTP_WINDOW = 1} // Allow ±1 time window (30s each)
    __init3() {this.TIME_STEP = 30} // TOTP time step in seconds

  constructor( cryptoService) {;this.cryptoService = cryptoService;TwoFactorAuthService.prototype.__init.call(this);TwoFactorAuthService.prototype.__init2.call(this);TwoFactorAuthService.prototype.__init3.call(this);}

  enableTwoFactor(userId) {
    const secret = this.cryptoService.generateSecureSecret();
    const qrCode = `otpauth://totp/ZYRO:${userId}?secret=${secret}&issuer=ZYRO`;
    
    this.twoFactorStates.set(userId, { secret, verified: false });
    
    return { secret, qrCode };
  }

  verifySetup(userId, code) {
    const state = this.twoFactorStates.get(userId);
    
    if (!state) {
      return { success: false, error: '2FA setup not found' };
    }

    if (this.verifyCode(code, state.secret)) {
      state.verified = true;
      return { success: true };
    }

    return { success: false, error: 'Invalid verification code' };
  }

  verifyLogin(userId, code) {
    const state = this.twoFactorStates.get(userId);
    
    if (!state || !state.verified) {
      return { success: false, error: '2FA not enabled' };
    }

    if (this.verifyCode(code, state.secret)) {
      return { success: true };
    }

    return { success: false, error: 'Invalid code' };
  }

  disableTwoFactor(userId) {
    this.twoFactorStates.delete(userId);
  }

  isTwoFactorEnabled(userId) {
    const state = this.twoFactorStates.get(userId);
    return _optionalChain([state, 'optionalAccess', _ => _.verified]) || false;
  }

  /**
   * Verify TOTP code against secret
   * Implements RFC 6238 Time-based One-Time Password algorithm
   * Validates code against current and adjacent time windows to handle clock skew
   */
   verifyCode(code, secret) {
    // Validate code format
    if (!/^\d{6}$/.test(code)) {
      return false;
    }

    // Prevent verification with invalid secret
    if (!secret || typeof secret !== 'string' || secret.length < 16) {
      return false;
    }

    const currentTimeCounter = Math.floor(Date.now() / 1000 / this.TIME_STEP);

    // Check current time window and adjacent windows to handle clock skew
    for (let i = -this.TOTP_WINDOW; i <= this.TOTP_WINDOW; i++) {
      const timeCounter = currentTimeCounter + i;
      const expectedCode = this.generateTOTPCodeSync(secret, timeCounter);

      // Use constant-time comparison to prevent timing attacks
      if (this.constantTimeCompare(code, expectedCode)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Generate TOTP code synchronously using HMAC-SHA1
   * Uses Web Crypto API compatible implementation
   */
   generateTOTPCodeSync(secret, timeCounter) {
    try {
      return this.cryptoService.generateTOTPSync(secret, timeCounter);
    } catch (e) {
      return '';
    }
  }

  /**
   * Constant-time string comparison to prevent timing attacks
   */
   constantTimeCompare(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }

    return result === 0;
  }
}
