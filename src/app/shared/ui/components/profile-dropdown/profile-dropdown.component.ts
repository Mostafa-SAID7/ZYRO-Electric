import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      <!-- Avatar Button -->
      <button
        (click)="toggleDropdown()"
        class="p-2.5 hover:bg-secondary rounded-full transition-colors duration-200 group relative"
        [title]="userName || 'Profile'">
        <div class="relative flex items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center text-white font-bold text-sm">
            {{ userInitial }}
          </div>
          @if (isOnline) {
            <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></div>
          }
        </div>
      </button>

      <!-- Dropdown Menu -->
      @if (isOpen) {
        <div class="absolute right-0 mt-2 w-56 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <!-- User Info -->
          <div class="px-4 py-3 bg-secondary/30 border-b border-border/50">
            <p class="font-bold text-foreground truncate">{{ userName }}</p>
            <p class="text-xs text-muted-foreground truncate">{{ userEmail }}</p>
          </div>

          <!-- Menu Items -->
          <div class="py-2">
            <!-- Profile -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="user" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>My Profile</span>
            </button>

            <!-- Orders Tracking -->
            <button
              (click)="navigateTo('/orders/tracking')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="package" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Track Orders</span>
            </button>

            <!-- Orders History -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="clock" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Order History</span>
            </button>

            <div class="my-2 border-t border-border/50"></div>

            <!-- Wishlist -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="heart" class="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors"></lucide-icon>
              <span>Wishlist</span>
            </button>

            <!-- Saved Addresses -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="map-pin" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Saved Addresses</span>
            </button>

            <!-- Payment Methods -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="credit-card" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Payment Methods</span>
            </button>

            <div class="my-2 border-t border-border/50"></div>

            <!-- Settings -->
            <button
              (click)="navigateTo('/profile')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="settings" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Preferences</span>
            </button>

            <!-- Help & Support -->
            <button
              (click)="navigateTo('/help')"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left text-sm font-medium text-foreground group">
              <lucide-icon name="info" class="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors"></lucide-icon>
              <span>Help & Support</span>
            </button>

            <div class="my-2 border-t border-border/50"></div>

            <!-- Logout -->
            <button
              (click)="onLogout()"
              class="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-500/10 transition-colors text-left text-sm font-medium text-red-500 group">
              <lucide-icon name="log-out" class="w-4 h-4 group-hover:scale-110 transition-transform"></lucide-icon>
              <span>Logout</span>
            </button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ProfileDropdownComponent {
  @Input() userName: string = '';
  @Input() userEmail: string = '';
  @Input() isOnline: boolean = false;
  @Output() logout = new EventEmitter<void>();

  isOpen = false;
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  get userInitial(): string {
    return this.userName ? this.userName.charAt(0).toUpperCase() : 'U';
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(route: string): void {
    this.isOpen = false;
    console.log(`[ProfileDropdown] Navigating to: ${route}`, {
      isOpen: this.isOpen
    });
    this.router.navigate([route]).then(success => {
      if (!success) {
        console.error(`[ProfileDropdown] Navigation to ${route} failed`, {
          route,
          userEmail: this.userEmail
        });
        // Try to navigate to home as fallback
        this.router.navigate(['/']);
      } else {
        console.log(`[ProfileDropdown] Successfully navigated to ${route}`);
      }
    }).catch(err => {
      console.error(`[ProfileDropdown] Navigation error:`, err);
    });
  }

  onLogout(): void {
    this.isOpen = false;
    this.logout.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}


