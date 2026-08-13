import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  template: `
    <div class="flex flex-col gap-2">
      @if (label) {
        <label class="section-label">{{ label }}</label>
      }
      <input
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
export class UiInputComponent {
  @Input() label?: string;
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() error?: string;
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.valueChange.emit(value);
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  getInputClasses(): string {
    return `form-input ${this.error ? 'error' : ''}`;
  }
}
