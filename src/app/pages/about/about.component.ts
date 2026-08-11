import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  currentYear = new Date().getFullYear();

  values = [
    {
      title: 'Quality',
      description: 'We believe in selling quality products that last. Every item is inspected and verified before shipping.',
      icon: '⭐'
    },
    {
      title: 'Integrity',
      description: 'Honest pricing, transparent policies, and authentic products. No hidden fees, no surprises.',
      icon: '🤝'
    },
    {
      title: 'Customer Focus',
      description: 'You\'re at the center of everything we do. Your feedback shapes our platform and product selection.',
      icon: '💙'
    },
    {
      title: 'Innovation',
      description: 'Always exploring new tech trends, products, and ways to improve your experience.',
      icon: '🚀'
    },
    {
      title: 'Sustainability',
      description: 'Responsible sourcing, eco-friendly packaging, and mindful business practices.',
      icon: '🌍'
    },
    {
      title: 'Community',
      description: 'Building a community of tech enthusiasts who share and support each other.',
      icon: '👥'
    }
  ];

  stats = [
    { label: 'Products in Stock', value: '45,000+' },
    { label: 'Tech Niches', value: '9' },
    { label: 'Countries Served', value: '150+' },
    { label: 'Happy Customers', value: '100,000+' }
  ];

  testimonials = [
    {
      name: 'Sarah M.',
      text: 'ZYRO has the best selection of tech accessories I\'ve ever seen. Quality products and amazing customer service!',
      rating: 5
    },
    {
      name: 'Alex T.',
      text: 'Fast shipping, great prices, and they actually care about their customers. Highly recommended!',
      rating: 5
    },
    {
      name: 'Jamie L.',
      text: 'Finally found all my tech needs in one place. ZYRO is my go-to for everything!',
      rating: 5
    }
  ];
}
