import { EventEmitter } from '@angular/core';

 

@Component({
  selector: 'app-ui-toast',
  template: `
    @if (isVisible) {
      <div
        [class]="getToastClasses()"
        role="alert">
        <div class="flex items-start gap-3">
          <lucide-icon
            [name]="getIconName()"
            class="w-5 h-5 flex-shrink-0 mt-0.5">
          </lucide-icon>
          <div class="flex-1">
            <h3 class="font-bold">{{ title }}</h3>
            <p class="text-sm opacity-90">{{ message }}</p>
          </div>
          <button
            (click)="close()"
            class="flex-shrink-0 hover:opacity-70">
            <lucide-icon name="x" class="w-5 h-5"></lucide-icon>
          </button>
        </div>
      </div>
    }
    `,
  styles: []
})
export class UiToastComponent {constructor() { UiToastComponent.prototype.__init.call(this);UiToastComponent.prototype.__init2.call(this);UiToastComponent.prototype.__init3.call(this);UiToastComponent.prototype.__init4.call(this);UiToastComponent.prototype.__init5.call(this);UiToastComponent.prototype.__init6.call(this);UiToastComponent.prototype.__init7.call(this); }
  Input() __init() {this.type = 'info'}
  Input() __init2() {this.title = ''}
  Input() __init3() {this.message = ''}
  Input() __init4() {this.duration = 5000}
  Output() __init5() {this.closed = new EventEmitter()}

  __init6() {this.isVisible = false}
   __init7() {this.timeoutId = null}

  show() {
    this.isVisible = true;
    if (this.duration > 0) {
      this.timeoutId = setTimeout(() => this.close(), this.duration);
    }
  }

  close() {
    this.isVisible = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.closed.emit();
  }

  getToastClasses() {
    const baseClasses = 'fixed bottom-4 right-4 max-w-sm p-3.5 rounded-xl shadow-lg backdrop-blur-sm animate-pulse-glow text-sm';
    const typeClasses = {
      success: 'bg-green-500 text-white border-l-4 border-green-700',
      error: 'bg-red-500 text-white border-l-4 border-red-700',
      warning: 'bg-yellow-500 text-white border-l-4 border-yellow-700',
      info: 'bg-blue-500 text-white border-l-4 border-blue-700'
    };
    return `${baseClasses} ${typeClasses[this.type]}`;
  }

  getIconName() {
    const icons = {
      success: 'check-circle',
      error: 'alert-circle',
      warning: 'alert-triangle',
      info: 'info'
    };
    return icons[this.type];
  }
}
