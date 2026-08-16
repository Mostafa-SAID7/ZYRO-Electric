import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class UiErrorComponent {constructor() { UiErrorComponent.prototype.__init.call(this);UiErrorComponent.prototype.__init2.call(this);UiErrorComponent.prototype.__init3.call(this); }
  Input() __init() {this.title = 'Something went wrong'}
  Input() __init2() {this.message = 'An unexpected error occurred'}
  Input() 
  Output() __init3() {this.retried = new EventEmitter()}

  retry() {
    this.retried.emit();
  }
}

@Component({
  selector: 'app-ui-error-boundary',
  templateUrl: './error-boundary.component.html',
  styleUrls: ['./error.component.scss']
})
export class UiErrorBoundaryComponent {constructor() { UiErrorBoundaryComponent.prototype.__init4.call(this);UiErrorBoundaryComponent.prototype.__init5.call(this);UiErrorBoundaryComponent.prototype.__init6.call(this);UiErrorBoundaryComponent.prototype.__init7.call(this);UiErrorBoundaryComponent.prototype.__init8.call(this); }
  __init4() {this.hasError = false}
  __init5() {this.errorMessage = ''}
  __init6() {this.errorDetails = ''}
  __init7() {this.errorId = ''}
  __init8() {this.errorTime = ''}

  captureError(error) {
    this.hasError = true;
    this.errorMessage = error instanceof Error ? error.message : 
      (error && typeof error === 'object' && 'message' in error ? String((error )['message']) : 'An unexpected error occurred. Please try again.');
    this.errorDetails = error instanceof Error ? error.stack || JSON.stringify(error, null, 2) : JSON.stringify(error, null, 2);
    this.errorId = 'ERR_' + Math.random().toString(36).substr(2, 9).toUpperCase();
    this.errorTime = new Date().toLocaleTimeString();
    console.error('Error Boundary Caught:', error);
    this.reportError();
  }

  resetError() {
    this.hasError = false;
    this.errorMessage = '';
    this.errorDetails = '';
  }

  goHome() {
    window.location.href = '/';
  }

   reportError() {
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    console.log('Report Error:', {
      errorId: this.errorId,
      message: this.errorMessage,
      timestamp: this.errorTime,
      stack: this.errorDetails
    });
  }
}

