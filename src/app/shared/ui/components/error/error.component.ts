import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
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
  templateUrl: './error-boundary.component.html',
  styleUrls: ['./error.component.scss']
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

