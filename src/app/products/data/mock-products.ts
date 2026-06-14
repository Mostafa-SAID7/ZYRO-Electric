/**
 * Comprehensive Mock Products Data
 * Contains realistic product data with proper images and details
 */

import { Product } from '../models';

export const MOCK_PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'prod-1',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features active noise cancellation, multi-device connectivity, and premium sound quality. Perfect for music lovers and professionals.',
    price: 249.99,
    originalPrice: 399.99,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'
    ],
    category: 'cat-1',
    rating: {
      average: 4.7,
      count: 2341,
      distribution: {
        1: 42,
        2: 89,
        3: 234,
        4: 567,
        5: 1409
      }
    },
    stock: 87,
    sku: 'HDP-BT-2024',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-10'),
    isActive: true,
    isFeatured: true,
    vendor: 'AudioTech Pro'
  },
  {
    id: 'prod-2',
    title: 'Smartphone Pro Max',
    description: 'Latest flagship smartphone with 6.7" AMOLED display, 5G connectivity, and advanced camera system. Features ultra-fast processor, all-day battery, and premium build quality.',
    price: 1099.99,
    originalPrice: 1299.99,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop'
    ],
    category: 'cat-1',
    rating: {
      average: 4.8,
      count: 5234,
      distribution: {
        1: 32,
        2: 67,
        3: 145,
        4: 892,
        5: 4098
      }
    },
    stock: 45,
    sku: 'SMPRO-MAX-24',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-12'),
    isActive: true,
    isFeatured: true,
    vendor: 'TechCore Electronics'
  },
  {
    id: 'prod-3',
    title: '4K Webcam',
    description: 'Professional 4K webcam for streaming and video calls. Features auto-focus, low-light correction, and built-in stereo microphone. USB plug-and-play with universal compatibility.',
    price: 179.99,
    originalPrice: 229.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'
    ],
    category: 'cat-1',
    rating: {
      average: 4.5,
      count: 834,
      distribution: {
        1: 28,
        2: 45,
        3: 156,
        4: 345,
        5: 260
      }
    },
    stock: 156,
    sku: 'WCAM-4K-PRO',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-06-08'),
    isActive: true,
    isFeatured: false,
    vendor: 'ProStream Tech'
  },

  // Fashion
  {
    id: 'prod-4',
    title: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish premium cotton t-shirt. Features 100% organic cotton, breathable fabric, and perfect fit. Available in multiple colors. Great for casual wear.',
    price: 29.99,
    originalPrice: 49.99,
    discount: 40,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1529720190099-b56b88b23406?w=500&h=500&fit=crop'
    ],
    category: 'cat-2',
    rating: {
      average: 4.6,
      count: 1567,
      distribution: {
        1: 45,
        2: 89,
        3: 267,
        4: 478,
        5: 688
      }
    },
    stock: 234,
    sku: 'TSHRT-ORG-01',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-11'),
    isActive: true,
    isFeatured: true,
    vendor: 'Fashion Basic Co.'
  },
  {
    id: 'prod-5',
    title: 'Casual Denim Jeans',
    description: 'Classic denim jeans with perfect fit and comfort. Features durable fabric, modern design, and flattering cut. Perfect for everyday wear.',
    price: 59.99,
    originalPrice: 89.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'
    ],
    category: 'cat-2',
    rating: {
      average: 4.4,
      count: 892,
      distribution: {
        1: 34,
        2: 78,
        3: 189,
        4: 345,
        5: 246
      }
    },
    stock: 145,
    sku: 'JEAN-CLSC-02',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-06-09'),
    isActive: true,
    isFeatured: false,
    vendor: 'DenimPro'
  },
  {
    id: 'prod-6',
    title: 'Elegant Watch',
    description: 'Stylish and elegant wristwatch with precision movement. Features water-resistant design, leather strap, and timeless style. Perfect for both casual and formal occasions.',
    price: 189.99,
    originalPrice: 279.99,
    discount: 32,
    image: 'https://images.unsplash.com/photo-1523170335684-f42f53bba104?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523170335684-f42f53bba104?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542296332-2e4473fda72d?w=500&h=500&fit=crop'
    ],
    category: 'cat-2',
    rating: {
      average: 4.7,
      count: 1234,
      distribution: {
        1: 23,
        2: 56,
        3: 145,
        4: 389,
        5: 621
      }
    },
    stock: 78,
    sku: 'WATCH-ELG-01',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-06-10'),
    isActive: true,
    isFeatured: true,
    vendor: 'TimeWear Luxury'
  },

  // Books
  {
    id: 'prod-7',
    title: 'The Art of Programming',
    description: 'Comprehensive guide to programming fundamentals and advanced concepts. Written by industry experts, this book covers algorithms, data structures, and best practices.',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    image: 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'
    ],
    category: 'cat-3',
    rating: {
      average: 4.8,
      count: 1876,
      distribution: {
        1: 18,
        2: 34,
        3: 89,
        4: 432,
        5: 1303
      }
    },
    stock: 267,
    sku: 'BOOK-PROG-01',
    createdAt: new Date('2023-12-15'),
    updatedAt: new Date('2024-06-10'),
    isActive: true,
    isFeatured: true,
    vendor: 'Tech Books Press'
  },
  {
    id: 'prod-8',
    title: 'Modern Web Design Trends',
    description: 'Explore cutting-edge web design principles and contemporary design trends. Includes practical examples and case studies from successful projects.',
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop'
    ],
    category: 'cat-3',
    rating: {
      average: 4.5,
      count: 945,
      distribution: {
        1: 23,
        2: 45,
        3: 134,
        4: 289,
        5: 454
      }
    },
    stock: 189,
    sku: 'BOOK-WEB-02',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-06-09'),
    isActive: true,
    isFeatured: false,
    vendor: 'Design Press International'
  },

  // Home & Living
  {
    id: 'prod-9',
    title: 'Stainless Steel Cookware Set',
    description: 'Professional-grade cookware set with 10 pieces. Features heat-resistant handles, non-stick coating, and dishwasher safe. Perfect for home chefs.',
    price: 299.99,
    originalPrice: 449.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbbc50bd94?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbbc50bd94?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&h=500&fit=crop'
    ],
    category: 'cat-4',
    rating: {
      average: 4.7,
      count: 1345,
      distribution: {
        1: 19,
        2: 43,
        3: 156,
        4: 456,
        5: 671
      }
    },
    stock: 94,
    sku: 'COOK-STEEL-01',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-06-11'),
    isActive: true,
    isFeatured: true,
    vendor: 'Premium Cookware Co.'
  },
  {
    id: 'prod-10',
    title: 'Comfortable Pillow Set',
    description: 'Luxurious pillow set with memory foam technology. Provides excellent support and comfort for better sleep. Hypoallergenic and machine washable.',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    image: 'https://images.unsplash.com/photo-1584622180873-d0f10d6f1d50?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584622180873-d0f10d6f1d50?w=500&h=500&fit=crop'
    ],
    category: 'cat-4',
    rating: {
      average: 4.6,
      count: 2134,
      distribution: {
        1: 34,
        2: 67,
        3: 245,
        4: 567,
        5: 1221
      }
    },
    stock: 312,
    sku: 'PIL-MEMRY-01',
    createdAt: new Date('2023-11-20'),
    updatedAt: new Date('2024-06-10'),
    isActive: true,
    isFeatured: false,
    vendor: 'Sleep Comfort Ltd.'
  },

  // Sports
  {
    id: 'prod-11',
    title: 'Professional Yoga Mat',
    description: 'High-quality yoga mat with non-slip surface and cushioning. Eco-friendly material, lightweight, and portable. Perfect for yoga, pilates, and fitness.',
    price: 49.99,
    originalPrice: 79.99,
    discount: 37,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop'
    ],
    category: 'cat-5',
    rating: {
      average: 4.8,
      count: 1876,
      distribution: {
        1: 15,
        2: 32,
        3: 98,
        4: 456,
        5: 1275
      }
    },
    stock: 234,
    sku: 'YOGA-MAT-01',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-10'),
    isActive: true,
    isFeatured: true,
    vendor: 'FitLife Sports'
  },
  {
    id: 'prod-12',
    title: 'Adjustable Dumbbells Set',
    description: 'Versatile dumbbell set with adjustable weights from 5-50 lbs. Compact design saves space, perfect for home gym. Easy weight adjustment system.',
    price: 199.99,
    originalPrice: 299.99,
    discount: 33,
    image: 'https://images.unsplash.com/photo-1638803040283-7a5ffd1d2bb5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1638803040283-7a5ffd1d2bb5?w=500&h=500&fit=crop'
    ],
    category: 'cat-5',
    rating: {
      average: 4.7,
      count: 1234,
      distribution: {
        1: 22,
        2: 45,
        3: 145,
        4: 389,
        5: 633
      }
    },
    stock: 87,
    sku: 'DMBL-ADJ-01',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-06-11'),
    isActive: true,
    isFeatured: true,
    vendor: 'Strong Start Fitness'
  }
];
