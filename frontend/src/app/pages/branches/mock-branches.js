

export const MOCK_BRANCHES = [
  {
    id: 'b-001',
    name: 'ZYRO Flagship Tech Hub',
    code: 'NY-01',
    city: 'New York',
    state: 'NY',
    address: '450 Fifth Avenue, Suite 1200',
    zipCode: '10018',
    phone: '+1 (212) 555-0199',
    email: 'ny-flagship@zyro-electric.com',
    isOpenNow: true,
    isMainBranch: true,
    manager: 'Alexander Vance',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
    services: ['Store Pickup', 'Tech Support Bar', 'Express Repairs', 'Product Demos', 'Trade-In Center'],
    openingHours: [
      { day: 'Mon - Fri', hours: '08:00 AM - 09:00 PM' },
      { day: 'Saturday', hours: '09:00 AM - 08:00 PM' },
      { day: 'Sunday', hours: '10:00 AM - 06:00 PM' }
    ]
  },
  {
    id: 'b-002',
    name: 'ZYRO Downtown Express',
    code: 'CA-01',
    city: 'San Francisco',
    state: 'CA',
    address: '88 Market Street',
    zipCode: '94105',
    phone: '+1 (415) 555-0142',
    email: 'sf-market@zyro-electric.com',
    isOpenNow: true,
    manager: 'Elena Rostova',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    services: ['Store Pickup', 'Tech Support Bar', 'Express Repairs'],
    openingHours: [
      { day: 'Mon - Fri', hours: '09:00 AM - 08:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 07:00 PM' },
      { day: 'Sunday', hours: '11:00 AM - 05:00 PM' }
    ]
  },
  {
    id: 'b-003',
    name: 'ZYRO Innovation Hub Austin',
    code: 'TX-01',
    city: 'Austin',
    state: 'TX',
    address: '1200 Congress Ave',
    zipCode: '78701',
    phone: '+1 (512) 555-0188',
    email: 'austin-hub@zyro-electric.com',
    isOpenNow: true,
    manager: 'Marcus Sterling',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    services: ['Store Pickup', 'Product Demos', 'Trade-In Center', 'VIP Lounge'],
    openingHours: [
      { day: 'Mon - Fri', hours: '09:00 AM - 08:00 PM' },
      { day: 'Saturday', hours: '09:00 AM - 07:00 PM' },
      { day: 'Sunday', hours: 'Closed' }
    ]
  },
  {
    id: 'b-004',
    name: 'ZYRO Chicago Loop Store',
    code: 'IL-01',
    city: 'Chicago',
    state: 'IL',
    address: '220 N Michigan Ave',
    zipCode: '60601',
    phone: '+1 (312) 555-0164',
    email: 'chicago-loop@zyro-electric.com',
    isOpenNow: false,
    manager: 'Sarah Jenkins',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    services: ['Store Pickup', 'Tech Support Bar', 'Express Repairs'],
    openingHours: [
      { day: 'Mon - Fri', hours: '09:00 AM - 07:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 06:00 PM' },
      { day: 'Sunday', hours: '12:00 PM - 05:00 PM' }
    ]
  },
  {
    id: 'b-005',
    name: 'ZYRO Miami Beach Experience Store',
    code: 'FL-01',
    city: 'Miami',
    state: 'FL',
    address: '701 Lincoln Rd',
    zipCode: '33139',
    phone: '+1 (305) 555-0123',
    email: 'miami-beach@zyro-electric.com',
    isOpenNow: true,
    manager: 'Carlos Mendez',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    services: ['Store Pickup', 'Product Demos', 'VIP Lounge', 'Custom Engraving'],
    openingHours: [
      { day: 'Mon - Sun', hours: '10:00 AM - 09:00 PM' }
    ]
  }
];
