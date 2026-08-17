import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  template: `
    <button
      [class]="getButtonClasses()"
      [disabled]="disabled"
      (click)="clicked.emit()">
      @if (icon) {
        <lucide-icon [name]="icon" class="w-4 h-4"></lucide-icon>
      }
      <span>{{ label }}</span>
    </button>
    `,
  styles: []
})
export class UiButtonComponent {constructor() { UiButtonComponent.prototype.__init.call(this);UiButtonComponent.prototype.__init2.call(this);UiButtonComponent.prototype.__init3.call(this);UiButtonComponent.prototype.__init4.call(this);UiButtonComponent.prototype.__init5.call(this); }
  Input() __init() {this.label = 'Button'}
  Input() __init2() {this.variant = 'primary'}
  Input() __init3() {this.size = 'md'}
  Input() 
  Input() __init4() {this.disabled = false}
  Output() __init5() {this.clicked = new EventEmitter()}

  getButtonClasses() {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-bold transition-all rounded-[var(--radius)] disabled:opacity-50';
    
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-lg'
    };

    const variantClasses = {
      primary: 'btn-primary',
      outline: 'btn-outline',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    };

    return `${baseClasses} ${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
  }
}
