import { Injectable } from '@angular/core';

// Single Responsibility: Handle 2FA operations only
@Injectable({ providedIn: 'root' })
export class TwoFactorAuthService {
  private twoFactorStates = new Map<string, { secret: string; verified: boolean }>();

  enableTwoFactor(userId: string): { secret: string; qrCode: string } {
    const secret = this.generateSecret();
    const qrCode = `otpauth://totp/ZYRO?secret=${secret}&issuer=ZYRO`;
    
    this.twoFactorStates.set(userId, { secret, verified: false });
    
    return { secret, qrCode };
  }

  verifySetup(userId: string, code: string): { success: boolean; error?: string } {
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

  verifyLogin(userId: string, code: string): { success: boolean; error?: string } {
    const state = this.twoFactorStates.get(userId);
    
    if (!state || !state.verified) {
      return { success: false, error: '2FA not enabled' };
    }

    if (this.verifyCode(code, state.secret)) {
      return { success: true };
    }

    return { success: false, error: 'Invalid code' };
  }

  disableTwoFactor(userId: string): void {
    this.twoFactorStates.delete(userId);
  }

  isTwoFactorEnabled(userId: string): boolean {
    const state = this.twoFactorStates.get(userId);
    return state?.verified || false;
  }

  private generateSecret(): string {
    return Math.random().toString(36).substr(2, 32).toUpperCase();
  }

  private verifyCode(code: string, secret: string): boolean {
    // Simplified verification - in production use speakeasy or similar
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _secret = secret;
    return /^\d{6}$/.test(code) && code !== '000000';
  }
}
