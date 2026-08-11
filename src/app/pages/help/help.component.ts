import { Component } from '@angular/core';

interface FAQItem {
  category: string;
  items: { question: string; answer: string }[];
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {
  expandedFAQ: string | null = null;

  faqs: FAQItem[] = [
    {
      category: 'Ordering & Purchases',
      items: [
        {
          question: 'How do I place an order?',
          answer: 'Browse products, add to cart, proceed to checkout, enter shipping address, select shipping method, and choose payment method. It takes just 5 minutes!'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept Credit Cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay.'
        },
        {
          question: 'Can I change or cancel my order?',
          answer: 'You can cancel within 2 hours of ordering if it hasn\'t shipped yet. Email support@zyro-electric.com for assistance.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      items: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard: 7-15 business days. Expedited: 3-5 business days. Overnight: 1-2 business days.'
        },
        {
          question: 'Do you offer free shipping?',
          answer: 'Yes! Free shipping on orders over $50 (continental US) and for Prime members.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! You\'ll receive a tracking number via email when your order ships. Track it on our site or the carrier\'s website.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      items: [
        {
          question: 'What\'s your return policy?',
          answer: '30-day returns for most items. Must be unopened, unused, in original packaging. See our full return policy for details.'
        },
        {
          question: 'How do I return an item?',
          answer: 'Log in → Order History → Select order → Click "Return Item" → Print label → Ship back. Simple!'
        },
        {
          question: 'When will I get my refund?',
          answer: '10-21 business days from delivery. We inspect (2-3 days), approve (1 day), process (5-7 days), then it appears in your account (3-5 days).'
        }
      ]
    }
  ];
}
