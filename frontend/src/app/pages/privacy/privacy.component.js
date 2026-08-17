
import { PRIVACY_SECTIONS, PRIVACY_LAST_UPDATED, PRIVACY_EFFECTIVE_DATE, } from './data';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {constructor() { PrivacyComponent.prototype.__init.call(this);PrivacyComponent.prototype.__init2.call(this);PrivacyComponent.prototype.__init3.call(this); }
  __init() {this.lastUpdated = PRIVACY_LAST_UPDATED}
  __init2() {this.effectiveDate = PRIVACY_EFFECTIVE_DATE}
  __init3() {this.sections = PRIVACY_SECTIONS}
}
