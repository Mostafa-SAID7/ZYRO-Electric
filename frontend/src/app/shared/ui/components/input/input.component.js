import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  template: `
    <div class="flex flex-col gap-2">
      @if (label) {
        <label [for]="inputId" class="section-label">{{ label }}</label>
      }
      <input
        [id]="inputId"
        [type]="type"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [class]="getInputClasses()"
        (input)="onInput($event)"
        (change)="onChange($event)">
        @if (error) {
          <span class="text-xs text-red-500">{{ error }}</span>
        }
      </div>
    `,
  styles: []
})
export class UiInputComponent {constructor() { UiInputComponent.prototype.__init.call(this);UiInputComponent.prototype.__init2.call(this);UiInputComponent.prototype.__init3.call(this);UiInputComponent.prototype.__init4.call(this);UiInputComponent.prototype.__init5.call(this);UiInputComponent.prototype.__init6.call(this); }
  __init() {this.inputId = 'input-' + Math.random().toString(36).substring(2, 9)}

  Input() 
  Input() __init2() {this.type = 'text'}
  Input() __init3() {this.value = ''}
  Input() __init4() {this.placeholder = ''}
  Input() __init5() {this.disabled = false}
  Input() 
  Output() __init6() {this.valueChange = new EventEmitter()}

  onInput(event) {
    const value = (event.target ).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  onChange(event) {
    const value = (event.target ).value;
    this.valueChange.emit(value);
  }

  getInputClasses() {
    return `form-input ${this.error ? 'error' : ''}`;
  }
}
