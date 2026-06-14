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
    <div *ngIf="hasError; else content" class="p-4">
      <app-ui-error 
        [title]="'Component Error'"
        [message]="errorMessage"
        (retried)="resetError()">
      </app-ui-error>
    </div>
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: []
})
export class UiErrorBoundaryComponent {
  hasError = false;
  errorMessage = '';

  captureError(error: Error): void {
    this.hasError = true;
    this.errorMessage = error.message || 'An unexpected error occurred';
    console.error('Error Boundary:', error);
  }

  resetError(): void {
    this.hasError = false;
    this.errorMessage = '';
  }
}
