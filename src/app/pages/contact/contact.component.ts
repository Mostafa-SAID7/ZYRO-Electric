import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  contactMethods = [
    {
      title: 'Email',
      icon: '📧',
      primary: 'support@zyro-electric.com',
      secondary: 'Response time: 24-48 hours'
    },
    {
      title: 'Phone',
      icon: '📞',
      primary: '1-800-ZYRO-HELP',
      secondary: 'Mon-Fri, 9 AM - 5 PM EST'
    },
    {
      title: 'Live Chat',
      icon: '💬',
      primary: 'Available on website',
      secondary: 'Mon-Fri, 9 AM - 5 PM EST'
    },
    {
      title: 'Social Media',
      icon: '📱',
      primary: '@zyro-electric',
      secondary: 'Response time: 24-48 hours'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      category: ['general', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // TODO: Send to backend API
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}
