import { inject } from '@angular/core';


import { AUTH_SERVICE_TOKEN, ORDER_SERVICE_TOKEN } from '../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {constructor() { ProfileComponent.prototype.__init.call(this);ProfileComponent.prototype.__init2.call(this);ProfileComponent.prototype.__init3.call(this);ProfileComponent.prototype.__init4.call(this);ProfileComponent.prototype.__init5.call(this); }
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init() {this.authService = inject(AUTH_SERVICE_TOKEN)}
   __init2() {this.orderService = inject(ORDER_SERVICE_TOKEN)}

  __init3() {this.userProfile = null}
  __init4() {this.orders = []}
  __init5() {this.isLoading = true}

  ngOnInit() {
    console.log('[ProfileComponent] Initializing profile page');
    
    this.authService.getUserProfile().subscribe({
      next: (profile) => {
        console.log('[ProfileComponent] User profile loaded:', profile);
        this.userProfile = profile;
      },
      error: (err) => {
        console.error('[ProfileComponent] Failed to load user profile:', err);
        this.isLoading = false;
      }
    });

    this.orderService.getOrders(1, 50).subscribe({
      next: (page) => {
        console.log('[ProfileComponent] Orders loaded:', page);
        this.orders = page.items;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[ProfileComponent] Failed to load orders:', err);
        this.isLoading = false;
      }
    });
  }
}
