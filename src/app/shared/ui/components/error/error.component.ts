import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-error',
  template: `
    <div class="card border-l-4 border-red-500 p-4 bg-red-50 dark:bg-red-900/20">
      <div class="flex items-start gap-3">
        <lucide-icon name="alert-circle" class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5"></lucide-icon>
        <div class="flex-1">
          <h3 class="font-bold text-red-700 dark:text-red-400">{{ title }}</h3>
          <p class="text-sm text-red-600 dark:text-red-300 mt-1">{{ message }}</p>
          <details *ngIf="details" class="mt-3 text-xs text-red-600 dark:text-red-400">
            <summary class="cursor-pointer font-semibold">Show Details</summary>
            <pre class="mt-2 bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-auto">{{ details }}</pre>
          </details>
        </div>
        <button 
          (click)="retry()"
          class="btn-outline px-3 py-1 text-sm flex-shrink-0">
          Retry
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class UiErrorComponent {
  @Input() title: string = 'Something went wrong';
  @Input() message: string = 'An unexpected error occurred';
  @Input() details?: string;
  @Output() retried = new EventEmitter<void>();

  retry(): void {
    this.retried.emit();
  }
}

@Component({
  selector: 'app-ui-error-boundary',
  template: `
    <ng-container *ngIf="!hasError; else errorState">
      <ng-content></ng-content>
    </ng-container>
    <ng-template #errorState>
      <div class="p-4 min-h-96 flex items-center justify-center">
        <div class="max-w-2xl w-full">
          <!-- Error Icon -->
          <div class="flex justify-center mb-6">
            <div class="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <lucide-icon name="alert-triangle" class="w-10 h-10 text-red-500"></lucide-icon>
            </div>
          </div>

          <!-- Error Message -->
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-foreground mb-2">Something went wrong</h2>
            <p class="text-muted-foreground">{{ errorMessage }}</p>
          </div>

          <!-- Error Details -->
          <app-ui-error 
            [title]="'Component Error'"
            [message]="errorMessage"
            [details]="errorDetails"
            (retried)="resetError()">
          </app-ui-error>

          <!-- Recovery Actions -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button 
              (click)="resetError()"
              class="btn-primary px-6 py-2 flex items-center justify-center gap-2">
              <lucide-icon name="refresh-cw" class="w-4 h-4"></lucide-icon>
              Try Again
            </button>
            <button 
              (click)="goHome()"
              class="btn-outline px-6 py-2 flex items-center justify-center gap-2">
              <lucide-icon name="home" class="w-4 h-4"></lucide-icon>
              Go Home
            </button>
          </div>

          <!-- Error Code -->
          <div class="text-center mt-6 text-xs text-muted-foreground">
            <p>Error ID: {{ errorId }}</p>
            <p>Time: {{ errorTime }}</p>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: []
})
export class UiErrorBoundaryComponent {
  hasError = false;
  errorMessage = '';
  errorDetails = '';
  errorId = '';
  errorTime = '';

  captureError(error: Error | any): void {
    this.hasError = true;
    this.errorMessage = error?.message || 'An unexpected error occurred. Please try again.';
    this.errorDetails = error?.stack || JSON.stringify(error, null, 2);
    this.errorId = 'ERR_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    this.errorTime = new Date().toLocaleTimeString();
    console.error('Error Boundary Caught:', error);
    this.reportError(error);
  }

  resetError(): void {
    this.hasError = false;
    this.errorMessage = '';
    this.errorDetails = '';
  }

  goHome(): void {
    window.location.href = '/';
  }

  private reportError(error: Error | any): void {
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    console.log('Report Error:', {
      errorId: this.errorId,
      message: this.errorMessage,
      timestamp: this.errorTime,
      stack: this.errorDetails
    });
  }
}

