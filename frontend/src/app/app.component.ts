import { Component } from '@angular/core';
import { SessionTimeoutWarningComponent } from './shared/components/session-timeout-warning/session-timeout-warning.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'market';
}
