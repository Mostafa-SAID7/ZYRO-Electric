

@Component({
  selector: 'app-ui-card',
  template: `
    <div [class]="getCardClasses()">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class UiCardComponent {constructor() { UiCardComponent.prototype.__init.call(this);UiCardComponent.prototype.__init2.call(this);UiCardComponent.prototype.__init3.call(this); }
  Input() __init() {this.variant = 'default'}
  Input() __init2() {this.padding = 'md'}
  Input() __init3() {this.hover = false}

  getCardClasses() {
    const baseClasses = 'rounded-[var(--radius)] overflow-hidden transition-all relative';
    
    const variantClasses = {
      default: 'card',
      glass: 'glass-card',
      'glass-strong': 'glass-card-strong'
    };

    const paddingClasses = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8'
    };

    const hoverClass = this.hover ? 'project-card-hover accent-glow' : '';

    return `${baseClasses} ${variantClasses[this.variant]} ${paddingClasses[this.padding]} ${hoverClass}`;
  }
}
