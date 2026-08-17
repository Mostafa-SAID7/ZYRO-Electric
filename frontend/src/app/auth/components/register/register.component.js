import { inject } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

import { AUTH_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
   __init() {this.fb = inject(FormBuilder)}
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init2() {this.authService = inject(AUTH_SERVICE_TOKEN)}
   __init3() {this.router = inject(Router)}

  ViewChild('toast') 
  
  
  __init4() {this.isLoading = false}

  constructor() {;RegisterComponent.prototype.__init.call(this);RegisterComponent.prototype.__init2.call(this);RegisterComponent.prototype.__init3.call(this);RegisterComponent.prototype.__init4.call(this);
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

  passwordMatchValidator(control) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (!this.registerForm.valid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'success';
          this.toast.title = 'Account Created';
          this.toast.message = 'Welcome! Redirecting to products...';
          this.toast.show();
        }
        
        setTimeout(() => this.router.navigate(['/products']), 2000);
      },
      error: (err) => {
        this.isLoading = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'error';
          this.toast.title = 'Registration Failed';
          this.toast.message = err || 'An error occurred';
          this.toast.show();
        }
      }
    });
  }

  isFieldInvalid(fieldName) {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
