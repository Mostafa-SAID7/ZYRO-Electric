
import { TERMS_SECTIONS, TERMS_LAST_UPDATED, } from './data';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {constructor() { TermsComponent.prototype.__init.call(this);TermsComponent.prototype.__init2.call(this); }
  __init() {this.lastUpdated = TERMS_LAST_UPDATED}
  __init2() {this.sections = TERMS_SECTIONS}
}
