

@Component({
  selector: 'app-ui-badge',
  template: `
    <span [class]="getBadgeClasses()">
      @if (icon) {
        <lucide-icon [name]="icon" class="w-3 h-3"></lucide-icon>
      }
      {{ label }}
    </span>
    `,
  styles: []
})
export class UiBadgeComponent {constructor() { UiBadgeComponent.prototype.__init.call(this);UiBadgeComponent.prototype.__init2.call(this); }
  Input() __init() {this.label = ''}
  Input() 
  Input() __init2() {this.variant = 'default'}

  getBadgeClasses() {
    const baseClasses = 'tag-skill inline-flex items-center gap-1';
    
    const variantClasses = {
      default: '',
      accent: '!bg-accent !text-accent-foreground !border-accent',
      success: '!bg-green-500 !text-white !border-green-500',
      warning: '!bg-yellow-500 !text-white !border-yellow-500',
      danger: '!bg-red-500 !text-white !border-red-500'
    };

    return `${baseClasses} ${variantClasses[this.variant]}`;
  }
}
