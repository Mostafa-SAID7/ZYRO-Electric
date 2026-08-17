import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-confirmation',
  template: `
    @if (isVisible) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div class="card glass-card-strong max-w-md w-full mx-4 p-6 animate-slide-in-right">
          <h2 class="text-xl font-bold text-accent mb-2">{{ title }}</h2>
          <p class="text-foreground mb-6">{{ message }}</p>
          <div class="flex gap-3 justify-end">
            <button
              (click)="cancel()"
              class="btn-outline px-4 py-2">
              {{ cancelLabel }}
            </button>
            <button
              (click)="confirm()"
              [class]="confirmButtonClass">
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    }
    `,
  styles: []
})
export class UiConfirmationComponent {constructor() { UiConfirmationComponent.prototype.__init.call(this);UiConfirmationComponent.prototype.__init2.call(this);UiConfirmationComponent.prototype.__init3.call(this);UiConfirmationComponent.prototype.__init4.call(this);UiConfirmationComponent.prototype.__init5.call(this);UiConfirmationComponent.prototype.__init6.call(this);UiConfirmationComponent.prototype.__init7.call(this);UiConfirmationComponent.prototype.__init8.call(this); }
  Input() __init() {this.title = 'Confirm'}
  Input() __init2() {this.message = ''}
  Input() __init3() {this.confirmLabel = 'Confirm'}
  Input() __init4() {this.cancelLabel = 'Cancel'}
  Input() __init5() {this.type = 'default'}
  Output() __init6() {this.confirmed = new EventEmitter()}
  Output() __init7() {this.cancelled = new EventEmitter()}

  __init8() {this.isVisible = false}

  open() {
    this.isVisible = true;
  }

  confirm() {
    this.isVisible = false;
    this.confirmed.emit();
  }

  cancel() {
    this.isVisible = false;
    this.cancelled.emit();
  }

  get confirmButtonClass() {
    return this.type === 'danger' 
      ? 'btn-primary !bg-red-500 hover:!bg-red-600 px-4 py-2'
      : 'btn-primary px-4 py-2';
  }
}
