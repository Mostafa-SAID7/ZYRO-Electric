import { inject } from '@angular/core';







import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor  {constructor() { AuthInterceptor.prototype.__init.call(this);AuthInterceptor.prototype.__init2.call(this); }
   __init() {this.authService = inject(AuthService)}
   __init2() {this.router = inject(Router)}


  intercept(request, next) {
    // Add auth token to requests
    const token = this.authService.getAuthToken();
    if (token && !request.url.includes('/auth/')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        // Handle 401 Unauthorized
        if (error.status === 401) {
          this.authService.logout().subscribe(() => {
            this.router.navigate(['/auth/login']);
          });
        }

        // Handle 403 Forbidden
        if (error.status === 403) {
          this.router.navigate(['/403']);
        }

        return throwError(() => error);
      })
    );
  }
}
