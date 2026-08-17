
import { CAREER_JOBS, CAREER_BENEFITS, } from './data';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent {constructor() { CareersComponent.prototype.__init.call(this);CareersComponent.prototype.__init2.call(this);CareersComponent.prototype.__init3.call(this); }
  __init() {this.jobs = CAREER_JOBS}
  __init2() {this.benefits = CAREER_BENEFITS}
  __init3() {this.selectedJob = null}
}
