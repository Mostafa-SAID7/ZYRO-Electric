
import { RETURN_WINDOW, FREE_RETURN_CONDITIONS, RETURN_PROCESS_STEPS, } from './data';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent {constructor() { ReturnsComponent.prototype.__init.call(this);ReturnsComponent.prototype.__init2.call(this);ReturnsComponent.prototype.__init3.call(this); }
  __init() {this.returnWindow = RETURN_WINDOW}
  __init2() {this.freeReturnConditions = FREE_RETURN_CONDITIONS}
  __init3() {this.processSteps = RETURN_PROCESS_STEPS}
}
