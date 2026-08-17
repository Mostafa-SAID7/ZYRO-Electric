
import { Subject } from 'rxjs';

 







// Single Responsibility: Handle toast notifications only
@Injectable({ providedIn: 'root' })
export class NotificationService {constructor() { NotificationService.prototype.__init.call(this);NotificationService.prototype.__init2.call(this); }
   __init() {this.toastSubject = new Subject()}
  __init2() {this.toast$ = this.toastSubject.asObservable()}

  show(title, message, type = 'info') {
    this.toastSubject.next({ type, title, message });
  }

  success(title, message) {
    this.show(title, message, 'success');
  }

  error(title, message) {
    this.show(title, message, 'error');
  }

  info(title, message) {
    this.show(title, message, 'info');
  }

  warning(title, message) {
    this.show(title, message, 'warning');
  }
}
