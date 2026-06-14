import { Category, FeaturedProduct, PromoOffer, Feature } from '../models';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', icon: '📱', color: 'from-blue-600 to-blue-400' },
  { id: '2', name: 'Fashion', icon: '👔', color: 'from-pink-600 to-pink-400' },
  { id: '3', name: 'Home & Garden', icon: '🏠', color: 'from-green-600 to-green-400' },
  { id: '4', name: 'Sports', icon: '⚽', color: 'from-orange-600 to-orange-400' },
  { id: '5', name: 'Books', icon: '📚', color: 'from-purple-600 to-purple-400' },
  { id: '6', name: 'Beauty', icon: '💄', color: 'from-red-600 to-red-400' }
];

export const MOCK_FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199,
    originalPrice: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 245,
    badge: '33% OFF'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 349,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 189,
    badge: '30% OFF'
  },
  {
    id: '3',
    name: 'Professional Camera',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 156,
    badge: '31% OFF'
  },
  {
    id: '4',
    name: 'Gaming Laptop',
    price: 1299,
    originalPrice: 1799,
    image: 'https://images.unsplash.com/photo-1588872657840-218e412ee5ff?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 324,
    badge: '28% OFF'
  },
  {
    id: '5',
    name: 'Wireless Charger',
    price: 49,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1591290621580-f0ab70e22b84?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 512,
    badge: '38% OFF'
  },
  {
    id: '6',
    name: '4K Monitor',
    price: 599,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 198,
    badge: '33% OFF'
  }
];

export const MOCK_PROMO_OFFERS: PromoOffer[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Get up to 50% off on selected items',
    icon: '🎉',
    gradient: 'from-blue-600 to-blue-400',
    buttonText: 'Shop Now',
    buttonColor: 'bg-white text-blue-600 hover:bg-blue-50'
  },
  {
    id: '2',
    title: 'Free Shipping',
    description: 'Orders over $50 ship free worldwide',
    icon: '🚚',
    gradient: 'from-pink-600 to-pink-400',
    buttonText: 'Learn More',
    buttonColor: 'bg-white text-pink-600 hover:bg-pink-50'
  }
];

export const MOCK_FEATURES: Feature[] = [
  {
    id: '1',
    icon: '✓',
    title: 'Fast Delivery',
    description: 'Get your orders delivered within 2-5 business days'
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
