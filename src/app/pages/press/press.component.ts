import { Component } from '@angular/core';

interface PressRelease {
  title: string;
  date: string;
  summary: string;
  category: string;
}

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss']
})
export class PressComponent {
  pressReleases: PressRelease[] = [
    {
      title: 'ZYRO-Electric Launches Industry-Leading Tech Accessories Platform',
      date: 'August 11, 2026',
      summary: 'New e-commerce platform offers curated selection of premium tech accessories across 9 niches with global shipping.',
      category: 'Launch'
    },
    {
      title: 'ZYRO Expands to 150+ Countries with International Shipping',
      date: 'July 2026',
      summary: 'Global expansion enables customers worldwide to access premium tech accessories with fast, reliable shipping.',
      category: 'Expansion'
    },
    {
      title: 'ZYRO Announces $10M Series A Funding Round',
      date: 'June 2026',
      summary: 'Investment fuels platform growth and product expansion for tech accessories market leader.',
      category: 'Funding'
    },
    {
      title: 'Record-Breaking Q2 Sales: ZYRO Surpasses 100,000 Customers',
      date: 'May 2026',
      summary: 'Strong momentum continues as ZYRO reaches milestone customer count and expands product selection.',
      category: 'Milestone'
    }
  ];

  mediaContacts = [
    {
      name: 'Sarah Johnson',
      title: 'VP Marketing & Communications',
      email: 'sarah@zyro-electric.com',
      phone: '+1-800-ZYRO-HELP'
    }
  ];
}
