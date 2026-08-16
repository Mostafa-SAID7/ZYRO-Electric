import { EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {constructor() { SelectComponent.prototype.__init.call(this);SelectComponent.prototype.__init2.call(this);SelectComponent.prototype.__init3.call(this); }
  Input() __init() {this.title = ''}
  Input() __init2() {this.data = []}
  Output() __init3() {this.selectedValue = new EventEmitter()}

  detectChanges(event) {
    this.selectedValue.emit(event)
  }
}

