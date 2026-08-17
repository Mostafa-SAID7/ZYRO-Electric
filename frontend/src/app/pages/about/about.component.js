
import { ABOUT_VALUES, ABOUT_STATS, ABOUT_TESTIMONIALS, } from './data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {constructor() { AboutComponent.prototype.__init.call(this);AboutComponent.prototype.__init2.call(this);AboutComponent.prototype.__init3.call(this);AboutComponent.prototype.__init4.call(this); }
  __init() {this.currentYear = new Date().getFullYear()}
  __init2() {this.values = ABOUT_VALUES}
  __init3() {this.stats = ABOUT_STATS}
  __init4() {this.testimonials = ABOUT_TESTIMONIALS}
}
