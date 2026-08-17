import { EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-ui-pagination',
  template: `
    <div class="flex justify-center items-center gap-2">
      <!-- Previous Button -->
      <button
        (click)="onPrevious()"
        [disabled]="currentPage === 1"
        class="btn-outline px-4 py-2"
        [class.opacity-50]="currentPage === 1">
        <lucide-icon name="chevron-left" class="w-4 h-4"></lucide-icon>
      </button>
    
      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <!-- First Page -->
        @if (pages[0] > 1) {
          <button
            (click)="onPageChange(1)"
            class="px-3 py-2 rounded btn-outline">
            1
          </button>
        }
    
        <!-- Ellipsis Before -->
        @if (pages[0] > 2) {
          <span class="px-2">...</span>
        }
    
        <!-- Page Range -->
        @for (page of pages; track page) {
          <button
            (click)="onPageChange(page)"
            [class.btn-primary]="page === currentPage"
            [class.btn-outline]="page !== currentPage"
            class="px-3 py-2 rounded">
            {{ page }}
          </button>
        }
    
        <!-- Ellipsis After -->
        @if (pages[pages.length - 1] < totalPages - 1) {
          <span class="px-2">...</span>
        }
    
        <!-- Last Page -->
        @if (pages[pages.length - 1] < totalPages) {
          <button
            (click)="onPageChange(totalPages)"
            class="px-3 py-2 rounded btn-outline">
            {{ totalPages }}
          </button>
        }
      </div>
    
      <!-- Next Button -->
      <button
        (click)="onNext()"
        [disabled]="currentPage === totalPages"
        class="btn-outline px-4 py-2"
        [class.opacity-50]="currentPage === totalPages">
        <lucide-icon name="chevron-right" class="w-4 h-4"></lucide-icon>
      </button>
    </div>
    
    <!-- Page Info -->
    @if (showPageInfo) {
      <div class="text-center text-sm text-muted-foreground mt-4">
        Page {{ currentPage }} of {{ totalPages }} ({{ totalItems }} items)
      </div>
    }
    `,
  styles: []
})
export class PaginationComponent  {constructor() { PaginationComponent.prototype.__init.call(this);PaginationComponent.prototype.__init2.call(this);PaginationComponent.prototype.__init3.call(this);PaginationComponent.prototype.__init4.call(this);PaginationComponent.prototype.__init5.call(this);PaginationComponent.prototype.__init6.call(this);PaginationComponent.prototype.__init7.call(this); }
  Input() __init() {this.currentPage = 1}
  Input() __init2() {this.totalPages = 1}
  Input() __init3() {this.totalItems = 0}
  Input() __init4() {this.pagesVisible = 5}
  Input() __init5() {this.showPageInfo = true}
  Output() __init6() {this.pageChange = new EventEmitter()}

  __init7() {this.pages = []}

  ngOnChanges(changes) {
    if (changes['currentPage'] || changes['totalPages']) {
      this.calculatePages();
    }
  }

   calculatePages() {
    const half = Math.floor(this.pagesVisible / 2);
    let start = Math.max(1, this.currentPage - half);
    const end = Math.min(this.totalPages, start + this.pagesVisible - 1);

    if (end - start + 1 < this.pagesVisible) {
      start = Math.max(1, end - this.pagesVisible + 1);
    }

    this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  onPrevious() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onNext() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPageChange(page) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
