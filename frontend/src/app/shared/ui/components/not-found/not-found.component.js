import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class UiNotFoundComponent {constructor() { UiNotFoundComponent.prototype.__init.call(this);UiNotFoundComponent.prototype.__init2.call(this);UiNotFoundComponent.prototype.__init3.call(this);UiNotFoundComponent.prototype.__init4.call(this); }
   __init() {this.router = inject(Router)}

  __init2() {this.message = 'Sorry, the page you are looking for does not exist or has been moved.'}
  __init3() {this.errorCode = '404_NOT_FOUND'}
  __init4() {this.timestamp = new Date().toLocaleString()}

  goHome() {
    this.router.navigate(['/']);
  }

  goProducts() {
    this.router.navigate(['/products']);
  }
}
