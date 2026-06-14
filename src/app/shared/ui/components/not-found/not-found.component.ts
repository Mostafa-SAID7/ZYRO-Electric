import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-not-found',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div class="max-w-2xl w-full">
        <!-- 404 Animation -->
        <div class="text-center mb-8">
          <div class="text-9xl font-bold text-accent mb-4 animate-pulse">
            404
          </div>
          <h1 class="text-4xl font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          <p class="text-lg text-muted-foreground mb-6">
            {{ message }}
          </p>
        </div>

        <!-- Error Icon -->
        <div class="flex justify-center mb-8">
          <div class="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
            <lucide-icon name="search-x" class="w-12 h-12 text-accent"></lucide-icon>
          </div>
        </div>

        <!-- Suggestions -->
        <div class="card glass-card-strong p-6 mb-8">
          <h2 class="text-lg font-bold text-accent mb-4">What you can do:</h2>
          <ul class="space-y-3 text-foreground">
            <li class="flex items-center gap-2">
              <lucide-icon name="arrow-right" class="w-5 h-5 text-accent"></lucide-icon>
              Check the URL for typos
            </li>
            <li class="flex items-center gap-2">
              <lucide-icon name="arrow-right" class="w-5 h-5 text-accent"></lucide-icon>
              Return to the home page
            </li>
            <li class="flex items-center gap-2">
              <lucide-icon name="arrow-right" class="w-5 h-5 text-accent"></lucide-icon>
              Try browsing our products
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            (click)="goHome()"
            class="btn-primary px-8 py-3 flex items-center justify-center gap-2">
            <lucide-icon name="home" class="w-5 h-5"></lucide-icon>
            Back to Home
          </button>
          <button 
            (click)="goProducts()"
            class="btn-outline px-8 py-3 flex items-center justify-center gap-2">
            <lucide-icon name="package" class="w-5 h-5"></lucide-icon>
            View Products
          </button>
        </div>

        <!-- Extra Info -->
        <div class="text-center mt-8 text-sm text-muted-foreground">
          <p>Error Code: {{ errorCode }}</p>
          <p class="mt-1">Timestamp: {{ timestamp }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UiNotFoundComponent {
  message = 'Sorry, the page you are looking for does not exist or has been moved.';
  errorCode = '404_NOT_FOUND';
  timestamp = new Date().toLocaleString();

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }

  goProducts(): void {
    this.router.navigate(['/products']);
  }
}
