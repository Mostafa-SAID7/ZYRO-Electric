import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerLinks = {
    company: [
      { label: 'About Us', route: '/about' },
      { label: 'Our Branches', route: '/branches' },
      { label: 'Careers', route: '/careers' },
      { label: 'Blog', route: '/blog' },
      { label: 'Press', route: '/press' }
    ],
    support: [
      { label: 'Help Center', route: '/help' },
      { label: 'Contact Us', route: '/contact' },
      { label: 'FAQ', route: '/faq' },
      { label: 'Shipping Info', route: '/shipping' }
    ],
    legal: [
      { label: 'Privacy Policy', route: '/privacy' },
      { label: 'Terms of Service', route: '/terms' },
      { label: 'Cookie Policy', route: '/cookies' },
      { label: 'Return Policy', route: '/returns' }
    ],
    social: [
      { label: 'Facebook', icon: 'facebook', url: 'https://facebook.com' },
      { label: 'Twitter', icon: 'twitter', url: 'https://twitter.com' },
      { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com' },
      { label: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com' }
    ]
  };

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openExternal(url: string): void {
    window.open(url, '_blank');
  }
}
