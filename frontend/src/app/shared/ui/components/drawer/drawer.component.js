import { EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-ui-drawer',
  template: `
    <!-- Backdrop Overlay -->
    @if (isOpen) {
      <div
        class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        tabindex="0"
        (click)="close()"
        (keyup.enter)="close()">
      </div>
    }
    
    <!-- Drawer Panel -->
    <div [ngClass]="getTranslationClass()"
      [class]="getDrawerClasses()">
    
      <!-- Gradient top accent bar -->
      <div class="h-1 w-full bg-gradient-to-r from-accent via-yellow-300 to-accent flex-shrink-0"></div>
    
      <!-- Drawer Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-card/80 backdrop-blur-md flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20">
            <ng-content select="[drawer-icon]"></ng-content>
          </div>
          <div>
            <h2 class="text-base font-black tracking-tight">{{ title }}</h2>
            @if (badge) {
              <app-ui-badge [label]="badge + ' items'" variant="accent"></app-ui-badge>
            }
          </div>
        </div>
        <button
          (click)="close()"
          class="w-9 h-9 flex items-center justify-center rounded-full bg-secondary hover:bg-muted border border-border/50 transition-all hover:scale-110"
          aria-label="Close drawer">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    
      <!-- Drawer Content (scrollable) -->
      <div class="flex-1 overflow-y-auto px-5 py-5" style="scrollbar-width: thin;">
        <ng-content select="[drawer-content]"></ng-content>
      </div>
    
      <!-- Drawer Footer -->
      <div class="border-t border-border/50 px-5 py-5 bg-card/80 backdrop-blur-md flex-shrink-0">
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
export class UiDrawerComponent {constructor() { UiDrawerComponent.prototype.__init.call(this);UiDrawerComponent.prototype.__init2.call(this);UiDrawerComponent.prototype.__init3.call(this);UiDrawerComponent.prototype.__init4.call(this); }
  Input() __init() {this.isOpen = false}
  Input() __init2() {this.title = 'Drawer'}
  Input() 
  Input() __init3() {this.position = 'right'}
  Output() __init4() {this.closed = new EventEmitter()}

  HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isOpen) {
      this.close();
    }
  }

  getDrawerClasses() {
    const baseClasses = 'fixed top-0 h-screen w-full sm:w-96 bg-card shadow-2xl transition-transform duration-300 ease-out z-50 flex flex-col overflow-hidden';
    
    const positionClasses = {
      left: 'left-0 border-r border-border rounded-r-[2rem]',
      right: 'right-0 border-l border-border rounded-l-[2rem]'
    };

    return `${baseClasses} ${positionClasses[this.position]}`;
  }

  getTranslationClass() {
    if (this.isOpen) {
      return 'translate-x-0';
    }
    return this.position === 'left' ? '-translate-x-full' : 'translate-x-full';
  }

  close() {
    this.closed.emit();
  }
}



