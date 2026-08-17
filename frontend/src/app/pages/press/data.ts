export interface PressRelease {
  title: string;
  date: string;
  summary: string;
  category: string;
}

export interface MediaContact {
  name: string;
  title: string;
  email: string;
  phone: string;
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    title: 'ZYRO-Electric Launches Industry-Leading Tech Accessories Platform',
    date: 'August 11, 2026',
    summary: 'New e-commerce platform offers curated selection of premium tech accessories across 9 niches with global shipping.',
    category: 'Launch'
  },
  {
    title: 'ZYRO Expands to 150+ Countries with International Shipping',
    date: 'July 2026',
    summary: 'Global expansion reaches 150+ countries, enabling customers worldwide to access premium tech accessories with fast, reliable shipping.',
    category: 'Expansion'
  },
  {
    title: 'ZYRO Announces $10M Series A Funding Round',
    date: 'June 2026',
    summary: 'ZYRO secures $10M Series A funding to accelerate platform growth and product expansion for tech accessories market leader.',
    category: 'Funding'
  },
  {
    title: 'Record-Breaking Q2 Sales: ZYRO Surpasses 100,000 Customers',
    date: 'May 2026',
    summary: 'Record-Breaking: ZYRO surpasses 100,000 customers in Q2, marking a major milestone as we expand our product selection and strengthen market position.',
    category: 'Milestone'
  }
];

export const MEDIA_CONTACTS: MediaContact[] = [
  {
    name: 'Sarah Johnson',
    title: 'VP Marketing & Communications',
    email: 'sarah@zyro-electric.com',
    phone: '+1-800-ZYRO-HELP'
  }
];
