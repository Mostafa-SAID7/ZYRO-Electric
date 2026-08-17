import { inject } from '@angular/core';
import { Router, } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {constructor() { AuthGuard.prototype.__init.call(this);AuthGuard.prototype.__init2.call(this); }
   __init() {this.router = inject(Router)}
   __init2() {this.authService = inject(AuthService)}


  canActivate(route, state) {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated) {
      return true;
    }

    console.warn(`[AuthGuard] Access denied. Not authenticated. Redirecting to login.`, {
      requestedUrl: state.url,
      isAuthenticated
    });
    
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
