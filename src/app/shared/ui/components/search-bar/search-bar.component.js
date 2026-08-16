import { EventEmitter, } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-ui-search-bar',
  template: `
    <div class="flex items-center gap-2 w-full">
      <div class="flex-1 relative">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (input)="onSearchInput($event)"
          [placeholder]="placeholder"
          class="form-input w-full pl-10">
          <lucide-icon name="search" class="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2"></lucide-icon>
        </div>
        @if (searchQuery) {
          <button
            (click)="clearSearch()"
            class="btn-outline px-3 py-2 flex items-center justify-center">
            <lucide-icon name="x" class="w-4 h-4"></lucide-icon>
          </button>
        }
      </div>
    `,
  styles: []
})
export class SearchBarComponent  {constructor() { SearchBarComponent.prototype.__init.call(this);SearchBarComponent.prototype.__init2.call(this);SearchBarComponent.prototype.__init3.call(this);SearchBarComponent.prototype.__init4.call(this);SearchBarComponent.prototype.__init5.call(this); }
  Input() __init() {this.placeholder = 'Search...'}
  Input() __init2() {this.debounceMs = 300}
  Output() __init3() {this.searchChange = new EventEmitter()}

  __init4() {this.searchQuery = ''}
   __init5() {this.searchSubject = new Subject()}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchChange.emit(query);
    });
  }

  onSearchInput(event) {
    const query = (event.target ).value;
    this.searchSubject.next(query);
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchChange.emit('');
  }
}
