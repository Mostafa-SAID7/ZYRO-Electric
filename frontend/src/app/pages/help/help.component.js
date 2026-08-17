
import { HELP_FAQS, } from './data';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {constructor() { HelpComponent.prototype.__init.call(this);HelpComponent.prototype.__init2.call(this); }
  __init() {this.expandedFAQ = null}
  __init2() {this.faqs = HELP_FAQS}
}
