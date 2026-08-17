import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AUTH_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   __init() {this.fb = inject(FormBuilder)}
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init2() {this.authService = inject(AUTH_SERVICE_TOKEN)}
   __init3() {this.router = inject(Router)}
   __init4() {this.route = inject(ActivatedRoute)}

  ViewChild('toast') 
  
  
  __init5() {this.isLoading = false}

  constructor() {;LoginComponent.prototype.__init.call(this);LoginComponent.prototype.__init2.call(this);LoginComponent.prototype.__init3.call(this);LoginComponent.prototype.__init4.call(this);LoginComponent.prototype.__init5.call(this);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) return;

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'success';
          this.toast.title = 'Success';
          this.toast.message = 'Logged in successfully';
          this.toast.show();
        }
        
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.isLoading = false;
        if (this.toast && typeof this.toast.show === 'function') {
          this.toast.type = 'error';
          this.toast.title = 'Login Failed';
          this.toast.message = err || 'An error occurred';
          this.toast.show();
        }
      }
    });
  }

  isFieldInvalid(fieldName) {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
