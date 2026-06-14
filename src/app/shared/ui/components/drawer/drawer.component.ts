import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-ui-drawer',
  template: `
    <!-- Drawer Overlay - Blocks everything -->
    <div *ngIf="isOpen" 
      class="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      (click)="close()">
    </div>

    <!-- Drawer Container - Full Height -->
    <div [ngClass]="{'translate-x-0': isOpen, 'translate-x-full': !isOpen}"
      [class]="getDrawerClasses()">
      
      <!-- Drawer Header -->
      <div class="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border bg-card">
        <h2 class="text-base sm:text-lg font-bold flex items-center gap-2 overflow-hidden">
          <ng-content select="[drawer-icon]"></ng-content>
          <span class="truncate">{{ title }}</span>
          <app-ui-badge *ngIf="badge" [label]="badge" variant="accent"></app-ui-badge>
        </h2>
        <button 
          (click)="close()"
          class="p-2 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
          [title]="'Close'"
          aria-label="Close drawer">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Drawer Content (scrollable) -->
      <div class="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 py-4">
        <ng-content select="[drawer-content]"></ng-content>
      </div>

      <!-- Drawer Footer -->
      <div class="border-t border-border px-4 sm:px-6 py-4 bg-card">
        <ng-content select="[drawer-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class UiDrawerComponent {
  @Input() isOpen = false;
  @Input() title = 'Drawer';
  @Input() badge?: string;
  @Input() position: 'left' | 'right' = 'right';
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  getDrawerClasses(): string {
    const baseClasses = 'fixed top-0 left-0 h-screen w-full sm:w-96 bg-card shadow-2xl transition-transform duration-300 ease-out z-50 flex flex-col overflow-hidden';
    
    const positionClasses: Record<string, string> = {
      left: 'border-r border-border',
      right: 'ml-auto border-l border-border'
    };

    return `${baseClasses} ${positionClasses[this.position]}`;
  }

  close(): void {
    this.closed.emit();
  }
}



