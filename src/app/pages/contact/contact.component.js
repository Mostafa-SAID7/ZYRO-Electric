import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CONTACT_METHODS, } from './data';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
   __init() {this.fb = inject(FormBuilder)}

  
  __init2() {this.submitted = false}
  __init3() {this.contactMethods = CONTACT_METHODS}

  constructor() {;ContactComponent.prototype.__init.call(this);ContactComponent.prototype.__init2.call(this);ContactComponent.prototype.__init3.call(this);
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      category: ['general', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // TODO: Send to backend API
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}
