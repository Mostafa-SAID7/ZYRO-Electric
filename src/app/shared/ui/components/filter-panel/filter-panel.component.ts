import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FilterGroup {
  id: string;
  name: string;
  type: 'select' | 'checkbox' | 'price-range' | 'rating';
  options?: { value: any; label: string }[];
  minValue?: number;
  maxValue?: number;
  currentValue?: any;
  currentMin?: number;
  currentMax?: number;
}

@Component({
  selector: 'app-ui-filter-panel',
  template: `
    <app-ui-card padding="lg" class="sticky top-24">
      <h2 class="text-lg font-bold text-accent mb-4 flex items-center gap-2">
        <lucide-icon name="filter" class="w-5 h-5"></lucide-icon>
        {{ title }}
      </h2>

      <!-- Filter Groups -->
      <div *ngFor="let group of filterGroups; let last = last" 
        [class.pb-6]="!last" 
        [class.border-b]="!last"
        [class.border-border]="!last">
        
        <!-- Select Filter -->
        <div *ngIf="group.type === 'select'" class="mb-6">
          <label class="section-label mb-2 block">{{ group.name }}</label>
          <select
            [(ngModel)]="group.currentValue"
            (change)="onFilterChange(group.id, group.currentValue)"
            class="form-input w-full">
            <option value="">All {{ group.name }}</option>
            <option *ngFor="let opt of group.options" [value]="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <!-- Checkbox Filter -->
        <div *ngIf="group.type === 'checkbox'" class="mb-6">
          <label class="section-label mb-2 block">{{ group.name }}</label>
          <div class="space-y-2">
            <label *ngFor="let opt of group.options" class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [checked]="isChecked(group.id, opt.value)"
                (change)="onCheckboxChange(group.id, opt.value, $event)"
                class="w-4 h-4">
              <span class="text-sm">{{ opt.label }}</span>
            </label>
          </div>
        </div>

        <!-- Price Range Filter -->
        <div *ngIf="group.type === 'price-range'" class="mb-6">
          <label class="section-label mb-2 block">{{ group.name }}</label>
          <div class="space-y-2">
            <div class="flex gap-2">
              <input
                type="number"
                [(ngModel)]="group.currentMin"
                [min]="group.minValue || 0"
                placeholder="Min"
                class="form-input w-1/2 text-sm">
              <input
                type="number"
                [(ngModel)]="group.currentMax"
                [max]="group.maxValue || 10000"
                placeholder="Max"
                class="form-input w-1/2 text-sm">
            </div>
            <button
              (click)="onPriceRangeChange(group.id)"
              class="btn-outline w-full py-2 text-sm">
              Apply
            </button>
          </div>
        </div>

        <!-- Rating Filter -->
        <div *ngIf="group.type === 'rating'" class="mb-6">
          <label class="section-label mb-3 block">{{ group.name }}</label>
          <div class="space-y-2">
            <label *ngFor="let i of [5,4,3,2,1]" class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [checked]="isChecked(group.id, i)"
                (change)="onRatingChange(group.id, i, $event)"
                class="w-4 h-4">
              <div class="flex items-center gap-1">
                <lucide-icon
                  *ngFor="let j of [1,2,3,4,5]"
                  name="star"
                  [class]="j <= i ? 'fill-accent text-accent' : 'text-muted'"
                  class="w-4 h-4"></lucide-icon>
              </div>
              <span class="text-sm text-muted-foreground">{{ i }}+</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Reset Button -->
      <button
        (click)="onReset()"
        class="btn-outline w-full mt-6 py-2 text-sm">
        Reset Filters
      </button>
    </app-ui-card>
  `,
  styles: []
})
export class FilterPanelComponent {
  @Input() title: string = 'Filters';
  @Input() filterGroups: FilterGroup[] = [];
  @Output() filterChange = new EventEmitter<{ filterId: string; value: any }>();
  @Output() reset = new EventEmitter<void>();

  checkedValues: Map<string, Set<any>> = new Map();

  ngOnInit(): void {
    // Initialize checked values map for checkbox and rating filters
    this.filterGroups.forEach(group => {
      if (group.type === 'checkbox' || group.type === 'rating') {
        this.checkedValues.set(group.id, new Set());
      }
    });
  }

  onFilterChange(filterId: string, value: any): void {
    this.filterChange.emit({ filterId, value });
  }

  onCheckboxChange(filterId: string, value: any, event: any): void {
    const checked = event.target.checked;
    if (!this.checkedValues.has(filterId)) {
      this.checkedValues.set(filterId, new Set());
    }

    const values = this.checkedValues.get(filterId)!;
    if (checked) {
      values.add(value);
    } else {
      values.delete(value);
    }

    this.filterChange.emit({ filterId, value: Array.from(values) });
  }

  onRatingChange(filterId: string, rating: number, event: any): void {
    const checked = event.target.checked;
    if (!this.checkedValues.has(filterId)) {
      this.checkedValues.set(filterId, new Set());
    }

    const values = this.checkedValues.get(filterId)!;
    if (checked) {
      values.clear(); // Only allow one rating selection
      values.add(rating);
    } else {
      values.delete(rating);
    }

    this.filterChange.emit({ filterId, value: Array.from(values)[0] || 0 });
  }

  onPriceRangeChange(filterId: string): void {
    const group = this.filterGroups.find(g => g.id === filterId);
    if (group) {
      this.filterChange.emit({ 
        filterId, 
        value: { min: group.currentMin, max: group.currentMax } 
      });
    }
  }

  isChecked(filterId: string, value: any): boolean {
    return this.checkedValues.get(filterId)?.has(value) ?? false;
  }

  onReset(): void {
    this.checkedValues.clear();
    this.filterGroups.forEach(group => {
      group.currentValue = '';
      group.currentMin = group.minValue;
      group.currentMax = group.maxValue;
    });
    this.reset.emit();
  }
}
