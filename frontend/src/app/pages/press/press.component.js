
import { PRESS_RELEASES, MEDIA_CONTACTS, } from './data';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent {constructor() { PressComponent.prototype.__init.call(this);PressComponent.prototype.__init2.call(this); }
  __init() {this.pressReleases = PRESS_RELEASES}
  __init2() {this.mediaContacts = MEDIA_CONTACTS}
}
