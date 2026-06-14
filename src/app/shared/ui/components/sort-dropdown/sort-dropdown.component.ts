import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SortOption {
  value: string;
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-ui-sort-dropdown',
  template: `
    <div class="flex items-center gap-2">
      <span class="text-sm text-muted-foreground">{{ label }}:</span>
      <select
        [(ngModel)]="selectedSort"
        (change)="onSortChange()"
        class="form-input text-sm">
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  `,
  styles: []
})
export class SortDropdownComponent {
  @Input() label: string = 'Sort by';
  @Input() options: SortOption[] = [];
  @Input() selectedSort: string = '';
  @Output() sortChange = new EventEmitter<string>();

  onSortChange(): void {
    this.sortChange.emit(this.selectedSort);
  }
}
