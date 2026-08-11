import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {
  lastUpdated = 'August 11, 2026';

  sections = [
    { title: 'Agreement to Terms', icon: '✓' },
    { title: 'Use License', icon: '📋' },
    { title: 'Disclaimer of Warranties', icon: '⚠️' },
    { title: 'Limitation of Liability', icon: '🛡️' },
    { title: 'Accuracy of Materials', icon: '✔️' },
    { title: 'User Accounts', icon: '👤' },
    { title: 'Products & Pricing', icon: '💰' },
    { title: 'Orders & Purchases', icon: '🛒' },
    { title: 'Shipping & Delivery', icon: '📦' },
    { title: 'Returns & Refunds', icon: '↩️' }
  ];
}
