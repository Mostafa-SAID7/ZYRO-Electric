import { Category, FeaturedProduct, PromoOffer, Feature, HeroSlide } from '../models';

// ============================================================
// ZYRO-Electric — Home Page Mock Data
// Aligned with mock-products-niches.ts (9 tech niche categories)
// ============================================================

export const MOCK_CATEGORIES: Category[] = [
  { id: 'smartphone-accessories',    name: 'Smartphone',       icon: '📱', color: 'from-violet-600 to-violet-400' },
  { id: 'laptop-accessories',        name: 'Laptop',           icon: '💻', color: 'from-blue-600 to-blue-400' },
  { id: 'cable-management',          name: 'Cable Mgmt',       icon: '🔌', color: 'from-emerald-600 to-emerald-400' },
  { id: 'desk-tech',                 name: 'Desk Tech',        icon: '🖥️', color: 'from-sky-600 to-sky-400' },
  { id: 'smart-device-accessories',  name: 'Smart Devices',    icon: '🏠', color: 'from-amber-600 to-amber-400' },
  { id: 'charging-accessories',      name: 'Charging',         icon: '⚡', color: 'from-yellow-600 to-yellow-400' },
  { id: 'photography-accessories',   name: 'Photography',      icon: '📷', color: 'from-rose-600 to-rose-400' },
  { id: 'content-creator-equipment', name: 'Creator Studio',   icon: '🎙️', color: 'from-fuchsia-600 to-fuchsia-400' },
  { id: 'electronics-organization',  name: 'Organization',     icon: '🗂️', color: 'from-teal-600 to-teal-400' },
];

export const MOCK_FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: 'lap-1',
    name: 'Laptop Stand Adjustable Aluminum',
    price: 39.99,
    originalPrice: 69.99,
    image: '/assets/accessories/laptop/laptop-stand.png',
    rating: 4.9,
    reviews: 3456,
    badge: '43% OFF'
  },
  {
    id: 'sp-1',
    name: 'Phone Case Pro',
    price: 29.99,
    originalPrice: 49.99,
    image: '/assets/accessories/phone/phone-case.png',
    rating: 4.8,
    reviews: 2341,
    badge: '40% OFF'
  },
  {
    id: 'photo-1',
    name: 'Camera Tripod Professional',
    price: 69.99,
    originalPrice: 119.99,
    image: '/assets/accessories/camera/camera-tripod.png',
    rating: 4.8,
    reviews: 2341,
    badge: '42% OFF'
  },
  {
    id: 'creator-1',
    name: 'USB Condenser Microphone Studio',
    price: 99.99,
    originalPrice: 169.99,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504c04?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 4567,
    badge: '41% OFF'
  },
  {
    id: 'charge-1',
    name: 'USB-C Fast Charger 65W',
    price: 39.99,
    originalPrice: 69.99,
    image: '/assets/accessories/phone/phone-charger.png',
    rating: 4.8,
    reviews: 4567,
    badge: '43% OFF'
  },
  {
    id: 'desk-1',
    name: 'Mechanical Keyboard RGB',
    price: 129.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 3456,
    badge: '35% OFF'
  }
];

export const MOCK_PROMO_OFFERS: PromoOffer[] = [
  {
    id: '1',
    title: 'Smartphone Accessories',
    description: 'Cases, screen protectors, chargers & more — up to 46% off',
    icon: '📱',
    gradient: 'from-violet-600 to-blue-500',
    bannerImage: '/assets/banners/banner-smartphone-accessories.png',
    buttonText: 'Shop Now',
    buttonColor: 'bg-white text-violet-700 hover:bg-violet-50'
  },
  {
    id: '2',
    title: 'Laptop Accessories',
    description: 'Stands, docks, SSDs & cooling pads — up to 44% off',
    icon: '💻',
    gradient: 'from-blue-700 to-sky-500',
    bannerImage: '/assets/banners/banner-laptop-accessories.png',
    buttonText: 'Explore Range',
    buttonColor: 'bg-white text-blue-700 hover:bg-blue-50'
  }
];

export const MOCK_FEATURES: Feature[] = [
  {
    id: '1',
    icon: '🚀',
    title: 'Fast Delivery',
    description: 'Get your orders delivered within 2–5 business days'
  },
  {
    id: '2',
    icon: '🛡️',
    title: 'Secure Payment',
    description: 'Your payment information is protected with 256-bit SSL encryption'
  },
  {
    id: '3',
    icon: '↩️',
    title: 'Easy Returns',
    description: '30-day money-back guarantee on all products'
  }
];

export const MOCK_HERO_SLIDES: HeroSlide[] = [
  {
    badge: '#1 Laptop Accessories',
    badgeIcon: 'laptop',
    badgeBg: 'rgba(232,197,71,0.12)',
    badgeBorder: 'rgba(232,197,71,0.4)',
    badgeText: '#E8C547',
    titlePrefix: 'Power Your',
    titleHighlight: 'Workspace',
    titleSuffix: 'in Style',
    description: 'Elevate your desk setup with premium stands, docks, cooling pads, and monitors. Built for professionals who demand the best.',
    ctaPrimary: 'Shop Laptop Gear',
    ctaSecondary: 'View All',
    image: '/assets/banners/banner-laptop-accessories.png',
    bgGradient: 'linear-gradient(135deg, var(--background) 0%, rgba(232,197,71,0.06) 100%)',
    accentColor: '#E8C547',
    tags: ['Laptop Stands', 'Docking Stations', 'Cooling Pads', 'External Monitors']
  },
  {
    badge: 'New Collection',
    badgeIcon: 'smartphone',
    badgeBg: 'rgba(59,130,246,0.12)',
    badgeBorder: 'rgba(59,130,246,0.4)',
    badgeText: '#3B82F6',
    titlePrefix: 'Protect &',
    titleHighlight: 'Charge',
    titleSuffix: 'Your Phone',
    description: 'Discover rugged cases, fast chargers, wireless pads, and pop sockets. Keep your smartphone powerful and protected all day.',
    ctaPrimary: 'Shop Phone Gear',
    ctaSecondary: 'See Deals',
    image: '/assets/banners/banner-smartphone-accessories.png',
    bgGradient: 'linear-gradient(135deg, var(--background) 0%, rgba(59,130,246,0.06) 100%)',
    accentColor: '#3B82F6',
    tags: ['Phone Cases', 'Fast Chargers', 'Wireless Pads', 'Screen Guards']
  },
  {
    badge: 'Creator Essentials',
    badgeIcon: 'camera',
    badgeBg: 'rgba(168,85,247,0.12)',
    badgeBorder: 'rgba(168,85,247,0.4)',
    badgeText: '#A855F7',
    titlePrefix: 'Create',
    titleHighlight: 'Content',
    titleSuffix: 'Like a Pro',
    description: 'Ring lights, tripods, macro lenses, and camera gimbals. Everything you need to shoot, record, and stream at a professional level.',
    ctaPrimary: 'Shop Creator Gear',
    ctaSecondary: 'Learn More',
    image: '/assets/collections/collection-photography-accessories.jpg',
    bgGradient: 'linear-gradient(135deg, var(--background) 0%, rgba(168,85,247,0.06) 100%)',
    accentColor: '#A855F7',
    tags: ['Ring Lights', 'Tripods', 'Camera Gimbals', 'Macro Lenses']
  },
  {
    badge: 'Best Sellers',
    badgeIcon: 'zap',
    badgeBg: 'rgba(34,197,94,0.12)',
    badgeBorder: 'rgba(34,197,94,0.4)',
    badgeText: '#22C55E',
    titlePrefix: 'Power Up',
    titleHighlight: 'Everything',
    titleSuffix: 'You Own',
    description: 'USB-C hubs, GaN chargers, multi-port adapters, and cable organizers. Stay charged and cable-free with our charging collection.',
    ctaPrimary: 'Shop Charging',
    ctaSecondary: 'View Deals',
    image: '/assets/banners/banner-charging-accessories.png',
    bgGradient: 'linear-gradient(135deg, var(--background) 0%, rgba(34,197,94,0.06) 100%)',
    accentColor: '#22C55E',
    tags: ['GaN Chargers', 'USB-C Hubs', 'Wireless Charging', 'Cable Management']
  }
];
