export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I place an order?',
    answer: 'Browse products, add to cart, enter shipping address, select shipping method, choose payment, and confirm. Takes about 5 minutes!'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, Mastercard, Amex, Discover, PayPal, Apple Pay, and Google Pay. All payments are 100% secure.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard: 7-15 days. Expedited: 3-5 days. Overnight: 1-2 days. Processing starts after payment is confirmed.'
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes! Free shipping on orders over $50 (continental US) and for all Prime members.'
  },
  {
    question: 'What\'s your return policy?',
    answer: '30-day returns for unopened, unused items in original packaging. Free returns for defective/wrong items. Easy process!'
  },
  {
    question: 'How long until I get my refund?',
    answer: '10-21 business days from delivery: inspection (2-3 days), approval (1 day), processing (5-7 days), account appearance (3-5 days).'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes! You\'ll receive a tracking number via email. Track it on our site or the carrier\'s website in real-time.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely! We use SSL encryption, PCI DSS compliance, and tokenization. Your card data is never stored.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to 150+ countries. International costs vary ($15.99-$49.99). Customs duties may apply.'
  },
  {
    question: 'What if my package doesn\'t arrive?',
    answer: 'Report within 7 days with your order number. We\'ll file a claim with the carrier, investigate, and offer replacement or refund.'
  }
];
