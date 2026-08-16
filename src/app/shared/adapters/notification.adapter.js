











/**
 * Toast Notification Adapter
 * Adapts the Toast UI component to implement INotificationService
 * Ensures the component is treated as a Liskov-substitutable implementation
 */
@Injectable({ providedIn: 'root' })
export class ToastNotificationAdapter  {constructor() { ToastNotificationAdapter.prototype.__init.call(this); }
   __init() {this.toastComponent = null}

  registerToastComponent(component) {
    this.toastComponent = component;
  }

  showSuccess(title, message) {
    if (this.toastComponent) {
      this.toastComponent.type = 'success';
      this.toastComponent.title = title;
      this.toastComponent.message = message;
      this.toastComponent.show();
    }
  }

  showError(title, message) {
    if (this.toastComponent) {
      this.toastComponent.type = 'error';
      this.toastComponent.title = title;
      this.toastComponent.message = message;
      this.toastComponent.show();
    }
  }

  showInfo(title, message) {
    if (this.toastComponent) {
      this.toastComponent.type = 'info';
      this.toastComponent.title = title;
      this.toastComponent.message = message;
      this.toastComponent.show();
    }
  }

  showWarning(title, message) {
    if (this.toastComponent) {
      this.toastComponent.type = 'warning';
      this.toastComponent.title = title;
      this.toastComponent.message = message;
      this.toastComponent.show();
    }
  }
}
