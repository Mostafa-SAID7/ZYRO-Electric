import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UiToastComponent } from '../../../shared/ui/components/toast/toast.component';

@Component({
  selector: 'app-auth-register',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <app-ui-card padding="lg">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold gradient-text mb-2">Create Account</h1>
            <p class="text-muted-foreground">Join our marketplace</p>
          </div>

          <!-- Form -->
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label class="section-label">Full Name</label>
              <input
                type="text"
                formControlName="name"
                placeholder="John Doe"
                class="form-input w-full mt-2"
                [class.error]="isFieldInvalid('name')">
            </div>

            <!-- Email -->
            <div>
              <label class="section-label">Email</label>
              <input
                type="email"
                formControlName="email"
                placeholder="you@example.com"
                class="form-input w-full mt-2"
                [class.error]="isFieldInvalid('email')">
            </div>

            <!-- Phone -->
            <div>
              <label class="section-label">Phone</label>
              <input
                type="tel"
                formControlName="phone"
                placeholder="+1 (555) 123-4567"
                class="form-input w-full mt-2"
                [class.error]="isFieldInvalid('phone')">
            </div>

            <!-- Address -->
            <div>
              <label class="section-label">Address</label>
              <input
                type="text"
                formControlName="address"
                placeholder="123 Main St, City, State"
                class="form-input w-full mt-2"
                [class.error]="isFieldInvalid('address')">
            </div>

            <!-- Password -->
            <div>
              <label class="section-label">Password</label>
              <input
                type="password"
                formControlName="password"
                placeholder="At least 8 characters"
                class="form-input w-full mt-2"
                [class.error]="isFieldInvalid('password')">
              <span *ngIf="isFieldInvalid('password')" class="text-xs text-red-500">
                Password must be at least 8 characters
              </span>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="section-label">Confirm Password</label>
              <input
                type="password"
                formControlName="confirmPassword"
                placeholder="Re-enter password"
                class="form-input w-full mt-2"
                [class.error]="registerForm.errors?.['passwordMismatch']">
              <span *ngIf="registerForm.errors?.['passwordMismatch']" class="text-xs text-red-500">
                Passwords do not match
              </span>
            </div>

            <!-- Terms -->
            <div class="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                formControlName="terms"
                class="w-4 h-4 rounded mt-1">
              <label for="terms" class="text-sm text-muted-foreground cursor-pointer">
                I agree to the Terms and Conditions
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="!registerForm.valid || isLoading"
              class="btn-primary w-full py-2 flex items-center justify-center gap-2">
              <lucide-icon *ngIf="!isLoading" name="user-plus" class="w-4 h-4"></lucide-icon>
              <span *ngIf="isLoading">Creating account...</span>
              <span *ngIf="!isLoading">Create Account</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-border"></div>
            <span class="text-xs text-muted-foreground">or</span>
            <div class="flex-1 h-px bg-border"></div>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <p class="text-muted-foreground">
              Already have an account?
              <a routerLink="/auth/login" class="text-accent font-semibold hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </app-ui-card>
      </div>
    </div>

    <!-- Toast -->
    <app-ui-toast #toast></app-ui-toast>
  `,
  styles: []
})
export class RegisterComponent {
  @ViewChild('toast') toast!: UiToastComponent;
  
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.toast.type = 'success';
        this.toast.title = 'Account Created';
        this.toast.message = 'Welcome! Redirecting to products...';
        this.toast.show();
        
        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.type = 'error';
        this.toast.title = 'Registration Failed';
        this.toast.message = err || 'An error occurred';
        this.toast.show();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
