

@Component({
  selector: 'app-ui-skeleton',
  template: `
    <div [class]="getSkeletonClasses()"></div>
  `,
  styles: []
})
export class UiSkeletonComponent {constructor() { UiSkeletonComponent.prototype.__init.call(this);UiSkeletonComponent.prototype.__init2.call(this);UiSkeletonComponent.prototype.__init3.call(this); }
  Input() __init() {this.variant = 'text'}
  Input() __init2() {this.width = '100%'}
  Input() __init3() {this.height = '1rem'}

  getSkeletonClasses() {
    const baseClasses = 'bg-muted rounded-[var(--radius)] animate-pulse';
    
    const variantClasses = {
      text: 'h-4 w-full',
      card: 'h-48 w-full',
      avatar: 'h-12 w-12 rounded-full',
      button: 'h-10 w-24'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}

@Component({
  selector: 'app-ui-skeleton-group',
  template: `
    <div [class]="'space-y-' + (gap === 'sm' ? '2' : gap === 'md' ? '4' : '6')">
      @for (item of skeletons; track $index) {
        <app-ui-skeleton
          [variant]="item.variant"
          [width]="item.width"
          [height]="item.height">
        </app-ui-skeleton>
      }
    </div>
    `,
  styles: []
})
export class UiSkeletonGroupComponent  {constructor() { UiSkeletonGroupComponent.prototype.__init4.call(this);UiSkeletonGroupComponent.prototype.__init5.call(this);UiSkeletonGroupComponent.prototype.__init6.call(this);UiSkeletonGroupComponent.prototype.__init7.call(this); }
  Input() __init4() {this.count = 3}
  Input() __init5() {this.variant = 'text'}
  Input() __init6() {this.gap = 'md'}

  __init7() {this.skeletons = []}

  ngOnInit() {
    this.updateSkeletons();
  }

  ngOnChanges() {
    this.updateSkeletons();
  }

   updateSkeletons() {
    this.skeletons = Array.from({ length: this.count }).map(() => ({
      variant: this.variant,
      width: '100%',
      height: this.variant === 'card' ? '200px' : '1rem'
    }));
  }
}
