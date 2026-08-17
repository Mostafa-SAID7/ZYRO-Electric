
import { COOKIE_TYPES, } from './data';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {constructor() { CookiesComponent.prototype.__init.call(this); }
  __init() {this.cookieTypes = COOKIE_TYPES}
}
