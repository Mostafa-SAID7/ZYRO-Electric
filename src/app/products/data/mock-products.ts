/**
 * Comprehensive Mock Products Data
 * Contains realistic product data with proper images and details
 */

import { Product } from '../models';

export const MOCK_PRODUCTS: Product[] = [
  // ======================== Electronics ========================
  {
    id: 'prod-1',
    title: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features active noise cancellation, multi-device connectivity, and premium sound quality.',
    price: 249.99, originalPrice: 399.99, discount: 37,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.7, count: 2341, distribution: { 1: 42, 2: 89, 3: 234, 4: 567, 5: 1409 } },
    stock: 87, sku: 'HDP-BT-2024', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'AudioTech Pro'
  },
  {
    id: 'prod-2',
    title: 'Smartphone Pro Max',
    description: 'Latest flagship smartphone with 6.7" AMOLED display, 5G connectivity, and advanced camera system. Features ultra-fast processor and all-day battery.',
    price: 1099.99, originalPrice: 1299.99, discount: 15,
    image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.8, count: 5234, distribution: { 1: 32, 2: 67, 3: 145, 4: 892, 5: 4098 } },
    stock: 45, sku: 'SMPRO-MAX-24', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-12'), isActive: true, isFeatured: true, vendor: 'TechCore Electronics'
  },
  {
    id: 'prod-3',
    title: '4K Webcam Pro',
    description: 'Professional 4K webcam for streaming and video calls. Features auto-focus, low-light correction, and built-in stereo microphone.',
    price: 179.99, originalPrice: 229.99, discount: 22,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.5, count: 834, distribution: { 1: 28, 2: 45, 3: 156, 4: 345, 5: 260 } },
    stock: 156, sku: 'WCAM-4K-PRO', createdAt: new Date('2024-03-10'), updatedAt: new Date('2024-06-08'), isActive: true, isFeatured: false, vendor: 'ProStream Tech'
  },
  {
    id: 'prod-13',
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with tactile switches, anti-ghosting, and fully programmable keys. Built for gamers and typists alike.',
    price: 129.99, originalPrice: 179.99, discount: 28,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.6, count: 1456, distribution: { 1: 30, 2: 60, 3: 180, 4: 456, 5: 730 } },
    stock: 120, sku: 'KB-MECH-RGB', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'GameZone Tech'
  },
  {
    id: 'prod-14',
    title: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with 25K DPI sensor, 70-hour battery, and ergonomic design. Zero-lag 2.4GHz wireless.',
    price: 89.99, originalPrice: 119.99, discount: 25,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.7, count: 987, distribution: { 1: 15, 2: 35, 3: 120, 4: 312, 5: 505 } },
    stock: 200, sku: 'MOUSE-WL-G', createdAt: new Date('2024-02-20'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'GameZone Tech'
  },
  {
    id: 'prod-15',
    title: 'Smart LED Desk Lamp',
    description: 'Adjustable smart LED desk lamp with wireless charging pad, touch controls, and 5 brightness levels. Perfect for home office or study.',
    price: 59.99, originalPrice: 89.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.4, count: 623, distribution: { 1: 20, 2: 40, 3: 110, 4: 210, 5: 243 } },
    stock: 340, sku: 'LAMP-SMART-01', createdAt: new Date('2024-03-15'), updatedAt: new Date('2024-06-09'), isActive: true, isFeatured: false, vendor: 'BrightTech'
  },
  {
    id: 'prod-16',
    title: 'Portable Bluetooth Speaker',
    description: 'Rugged waterproof Bluetooth speaker with 360° surround sound, 24-hour battery, and built-in powerbank. Take your music anywhere.',
    price: 79.99, originalPrice: 119.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.6, count: 1120, distribution: { 1: 25, 2: 50, 3: 150, 4: 380, 5: 515 } },
    stock: 180, sku: 'SPKR-BT-P', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'SoundWave'
  },
  {
    id: 'prod-17',
    title: 'Ultra-Wide Curved Monitor',
    description: '34" ultra-wide curved gaming monitor with 165Hz refresh rate, 1ms response time, and HDR 400. Immersive experience for gamers and creators.',
    price: 499.99, originalPrice: 699.99, discount: 29,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&h=500&fit=crop'],
    category: 'cat-1',
    rating: { average: 4.9, count: 788, distribution: { 1: 5, 2: 10, 3: 45, 4: 200, 5: 528 } },
    stock: 55, sku: 'MON-UW-34', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-12'), isActive: true, isFeatured: true, vendor: 'VisionPro Displays'
  },

  // ======================== Fashion ========================
  {
    id: 'prod-4',
    title: 'Premium Cotton T-Shirt',
    description: 'Comfortable and stylish premium cotton t-shirt. 100% organic cotton, breathable fabric, and perfect fit. Great for casual wear.',
    price: 29.99, originalPrice: 49.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.6, count: 1567, distribution: { 1: 45, 2: 89, 3: 267, 4: 478, 5: 688 } },
    stock: 234, sku: 'TSHRT-ORG-01', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'Fashion Basic Co.'
  },
  {
    id: 'prod-5',
    title: 'Casual Denim Jeans',
    description: 'Classic denim jeans with perfect fit and comfort. Durable fabric, modern design, and flattering cut. Perfect for everyday wear.',
    price: 59.99, originalPrice: 89.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.4, count: 892, distribution: { 1: 34, 2: 78, 3: 189, 4: 345, 5: 246 } },
    stock: 145, sku: 'JEAN-CLSC-02', createdAt: new Date('2024-02-05'), updatedAt: new Date('2024-06-09'), isActive: true, isFeatured: false, vendor: 'DenimPro'
  },
  {
    id: 'prod-6',
    title: 'Elegant Wristwatch',
    description: 'Stylish and elegant wristwatch with precision movement. Water-resistant design, leather strap, and timeless style.',
    price: 189.99, originalPrice: 279.99, discount: 32,
    image: 'https://images.unsplash.com/photo-1523170335684-f42f53bba104?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1523170335684-f42f53bba104?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.7, count: 1234, distribution: { 1: 23, 2: 56, 3: 145, 4: 389, 5: 621 } },
    stock: 78, sku: 'WATCH-ELG-01', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'TimeWear Luxury'
  },
  {
    id: 'prod-18',
    title: 'Leather Sneakers',
    description: 'Premium leather sneakers with cushioned sole and breathable lining. Versatile design suitable for both casual and semi-formal occasions.',
    price: 119.99, originalPrice: 169.99, discount: 29,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.5, count: 876, distribution: { 1: 28, 2: 52, 3: 134, 4: 298, 5: 364 } },
    stock: 92, sku: 'SHOE-LEATH-01', createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'StepStyle'
  },
  {
    id: 'prod-19',
    title: 'Stylish Backpack',
    description: 'Lightweight yet durable backpack with laptop compartment, USB charging port, and multiple pockets. Ideal for travel or daily commute.',
    price: 69.99, originalPrice: 99.99, discount: 30,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.6, count: 1102, distribution: { 1: 20, 2: 48, 3: 156, 4: 362, 5: 516 } },
    stock: 210, sku: 'BAG-BKPK-02', createdAt: new Date('2024-01-30'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'UrbanCarry'
  },
  {
    id: 'prod-20',
    title: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV400 protection, polarized lenses, and lightweight titanium frame. Style meets function.',
    price: 79.99, originalPrice: 119.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'],
    category: 'cat-2',
    rating: { average: 4.3, count: 654, distribution: { 1: 32, 2: 67, 3: 145, 4: 210, 5: 200 } },
    stock: 180, sku: 'GLASS-AV-01', createdAt: new Date('2024-03-05'), updatedAt: new Date('2024-06-09'), isActive: true, isFeatured: false, vendor: 'VisionStyle'
  },

  // ======================== Books ========================
  {
    id: 'prod-7',
    title: 'The Art of Programming',
    description: 'Comprehensive guide to programming fundamentals and advanced concepts. Covers algorithms, data structures, and best practices from industry experts.',
    price: 49.99, originalPrice: 69.99, discount: 29,
    image: 'https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1507842872343-583f20270319?w=500&h=500&fit=crop'],
    category: 'cat-3',
    rating: { average: 4.8, count: 1876, distribution: { 1: 18, 2: 34, 3: 89, 4: 432, 5: 1303 } },
    stock: 267, sku: 'BOOK-PROG-01', createdAt: new Date('2023-12-15'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'Tech Books Press'
  },
  {
    id: 'prod-8',
    title: 'Modern Web Design Trends',
    description: 'Explore cutting-edge web design principles and contemporary trends with practical examples and case studies from successful projects.',
    price: 39.99, originalPrice: 59.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop'],
    category: 'cat-3',
    rating: { average: 4.5, count: 945, distribution: { 1: 23, 2: 45, 3: 134, 4: 289, 5: 454 } },
    stock: 189, sku: 'BOOK-WEB-02', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-09'), isActive: true, isFeatured: false, vendor: 'Design Press International'
  },
  {
    id: 'prod-21',
    title: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness. A must-read for understanding the human behavior behind financial decisions.',
    price: 24.99, originalPrice: 34.99, discount: 29,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=500&fit=crop'],
    category: 'cat-3',
    rating: { average: 4.9, count: 3421, distribution: { 1: 12, 2: 23, 3: 56, 4: 456, 5: 2874 } },
    stock: 430, sku: 'BOOK-PSY-03', createdAt: new Date('2023-11-05'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'Insight Books'
  },
  {
    id: 'prod-22',
    title: 'Atomic Habits',
    description: 'An easy and proven way to build good habits and break bad ones. Transform your life with tiny changes that compound into remarkable results.',
    price: 19.99, originalPrice: 29.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=500&fit=crop'],
    category: 'cat-3',
    rating: { average: 4.9, count: 5678, distribution: { 1: 10, 2: 18, 3: 45, 4: 678, 5: 4927 } },
    stock: 512, sku: 'BOOK-ATOM-04', createdAt: new Date('2023-10-01'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'Mindset Press'
  },

  // ======================== Home & Living ========================
  {
    id: 'prod-9',
    title: 'Stainless Steel Cookware Set',
    description: 'Professional-grade 10-piece cookware set. Heat-resistant handles, non-stick coating, and dishwasher safe. Perfect for home chefs.',
    price: 299.99, originalPrice: 449.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbbc50bd94?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1584568694244-14fbbc50bd94?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.7, count: 1345, distribution: { 1: 19, 2: 43, 3: 156, 4: 456, 5: 671 } },
    stock: 94, sku: 'COOK-STEEL-01', createdAt: new Date('2024-01-05'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'Premium Cookware Co.'
  },
  {
    id: 'prod-10',
    title: 'Memory Foam Pillow Set',
    description: 'Luxurious pillow set with memory foam technology. Excellent support and comfort for better sleep. Hypoallergenic and machine washable.',
    price: 79.99, originalPrice: 129.99, discount: 38,
    image: 'https://images.unsplash.com/photo-1584622180873-d0f10d6f1d50?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1584622180873-d0f10d6f1d50?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.6, count: 2134, distribution: { 1: 34, 2: 67, 3: 245, 4: 567, 5: 1221 } },
    stock: 312, sku: 'PIL-MEMRY-01', createdAt: new Date('2023-11-20'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'Sleep Comfort Ltd.'
  },
  {
    id: 'prod-23',
    title: 'Scented Soy Candle Set',
    description: 'Handcrafted soy candle set with 6 relaxing scents. Long burn time up to 50 hours, natural ingredients, and elegant glass jar packaging.',
    price: 44.99, originalPrice: 64.99, discount: 31,
    image: 'https://images.unsplash.com/photo-1602607910791-b53d16a0e003?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1602607910791-b53d16a0e003?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.8, count: 987, distribution: { 1: 8, 2: 15, 3: 67, 4: 254, 5: 643 } },
    stock: 280, sku: 'CNDL-SOY-SET', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'AromaHome'
  },
  {
    id: 'prod-24',
    title: 'Smart Robot Vacuum Cleaner',
    description: 'Advanced robot vacuum with laser navigation, auto-empty base, and 180-min battery. Cleans carpets and hard floors effortlessly via app control.',
    price: 349.99, originalPrice: 499.99, discount: 30,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.6, count: 1234, distribution: { 1: 22, 2: 45, 3: 145, 4: 400, 5: 622 } },
    stock: 67, sku: 'VAC-ROBO-LN', createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'CleanBot Pro'
  },
  {
    id: 'prod-25',
    title: 'Indoor Plant Collection',
    description: 'Set of 5 easy-care indoor plants including pothos, snake plant, and succulents. Comes with decorative pots and care instructions.',
    price: 54.99, originalPrice: 79.99, discount: 31,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.7, count: 765, distribution: { 1: 10, 2: 22, 3: 78, 4: 220, 5: 435 } },
    stock: 145, sku: 'PLANT-IND-5PK', createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'GreenSpace'
  },
  {
    id: 'prod-26',
    title: 'Coffee & Espresso Maker',
    description: 'All-in-one coffee machine with built-in grinder, milk frother, and 15-bar pressure. Brew espresso, cappuccino, and latte at home.',
    price: 219.99, originalPrice: 319.99, discount: 31,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop'],
    category: 'cat-4',
    rating: { average: 4.8, count: 1876, distribution: { 1: 15, 2: 30, 3: 98, 4: 456, 5: 1277 } },
    stock: 88, sku: 'COFF-ESP-MK', createdAt: new Date('2024-01-08'), updatedAt: new Date('2024-06-12'), isActive: true, isFeatured: true, vendor: 'BrewMaster'
  },

  // ======================== Sports ========================
  {
    id: 'prod-11',
    title: 'Professional Yoga Mat',
    description: 'High-quality yoga mat with non-slip surface and cushioning. Eco-friendly material, lightweight, and portable. Perfect for yoga and fitness.',
    price: 49.99, originalPrice: 79.99, discount: 37,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.8, count: 1876, distribution: { 1: 15, 2: 32, 3: 98, 4: 456, 5: 1275 } },
    stock: 234, sku: 'YOGA-MAT-01', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: true, vendor: 'FitLife Sports'
  },
  {
    id: 'prod-12',
    title: 'Adjustable Dumbbells Set',
    description: 'Versatile dumbbell set with adjustable weights from 5-50 lbs. Compact design saves space, perfect for home gym.',
    price: 199.99, originalPrice: 299.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1638803040283-7a5ffd1d2bb5?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1638803040283-7a5ffd1d2bb5?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.7, count: 1234, distribution: { 1: 22, 2: 45, 3: 145, 4: 389, 5: 633 } },
    stock: 87, sku: 'DMBL-ADJ-01', createdAt: new Date('2024-01-18'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'Strong Start Fitness'
  },
  {
    id: 'prod-27',
    title: 'Running Shoes Pro',
    description: 'High-performance running shoes with responsive foam midsole, breathable mesh upper, and durable rubber outsole. Built for distance runners.',
    price: 139.99, originalPrice: 189.99, discount: 26,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.6, count: 2341, distribution: { 1: 30, 2: 65, 3: 210, 4: 700, 5: 1336 } },
    stock: 195, sku: 'SHOE-RUN-01', createdAt: new Date('2024-02-20'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'TrailBlazer'
  },
  {
    id: 'prod-28',
    title: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water-resistant up to 50m.',
    price: 99.99, originalPrice: 149.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.5, count: 1567, distribution: { 1: 35, 2: 70, 3: 200, 4: 520, 5: 742 } },
    stock: 267, sku: 'FIT-TRACK-S', createdAt: new Date('2024-01-22'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'FitLife Sports'
  },
  {
    id: 'prod-29',
    title: 'Resistance Bands Set',
    description: 'Complete resistance band kit with 5 bands (10-50 lbs), handles, ankle straps, and door anchor. Perfect for full-body workouts.',
    price: 34.99, originalPrice: 49.99, discount: 30,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.7, count: 987, distribution: { 1: 12, 2: 28, 3: 98, 4: 320, 5: 529 } },
    stock: 456, sku: 'BAND-RES-5PK', createdAt: new Date('2024-03-10'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'FlexFit'
  },
  {
    id: 'prod-30',
    title: 'Cycling Helmet Pro',
    description: 'Aerodynamic cycling helmet with MIPS safety technology, 20 ventilation channels, and adjustable fit system. Lightweight at just 280g.',
    price: 89.99, originalPrice: 129.99, discount: 31,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&color=sport',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.8, count: 654, distribution: { 1: 8, 2: 15, 3: 60, 4: 200, 5: 371 } },
    stock: 123, sku: 'HELM-CYC-01', createdAt: new Date('2024-02-28'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'RideGear'
  },
  {
    id: 'prod-31',
    title: 'Pull-Up Bar (Doorframe)',
    description: 'Heavy-duty doorframe pull-up bar supporting up to 300 lbs. No screws required, easy installation and removal. Multiple grip positions.',
    price: 39.99, originalPrice: 59.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.6, count: 1123, distribution: { 1: 18, 2: 42, 3: 145, 4: 380, 5: 538 } },
    stock: 380, sku: 'BAR-PULL-D', createdAt: new Date('2024-03-05'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: true, vendor: 'Strong Start Fitness'
  },
  {
    id: 'prod-32',
    title: 'Foam Roller Set',
    description: 'Premium foam roller set for muscle recovery and deep tissue massage. Includes high-density roller, spiky ball, and massage stick.',
    price: 29.99, originalPrice: 44.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.5, count: 876, distribution: { 1: 22, 2: 45, 3: 134, 4: 288, 5: 387 } },
    stock: 290, sku: 'FOAM-RLR-ST', createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-06-09'), isActive: true, isFeatured: false, vendor: 'FlexFit'
  },
  {
    id: 'prod-33',
    title: 'Swimming Goggles Elite',
    description: 'Professional swim goggles with anti-fog UV400 lenses, silicone seal, and adjustable nose bridge. Suitable for pool and open water.',
    price: 24.99, originalPrice: 39.99, discount: 38,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.7, count: 543, distribution: { 1: 8, 2: 14, 3: 56, 4: 178, 5: 287 } },
    stock: 520, sku: 'GOGG-SWIM-E', createdAt: new Date('2024-03-20'), updatedAt: new Date('2024-06-10'), isActive: true, isFeatured: false, vendor: 'AquaSpeed'
  },
  {
    id: 'prod-34',
    title: 'Insulated Water Bottle 1L',
    description: 'Triple-insulated stainless steel water bottle keeps drinks cold 24h or hot 12h. Leak-proof lid, BPA-free, and fits most car cup holders.',
    price: 34.99, originalPrice: 49.99, discount: 30,
    image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1553531384-397c80973a0b?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.8, count: 2341, distribution: { 1: 15, 2: 28, 3: 89, 4: 620, 5: 1589 } },
    stock: 640, sku: 'WTBOTL-INS-1', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-12'), isActive: true, isFeatured: false, vendor: 'HydroLife'
  },
  {
    id: 'prod-35',
    title: 'Jump Rope Speed Cable',
    description: 'Professional speed jump rope with 360° ball bearings, adjustable steel cable, and foam handles. Great for cardio and crossfit training.',
    price: 19.99, originalPrice: 29.99, discount: 33,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop'],
    category: 'cat-5',
    rating: { average: 4.6, count: 789, distribution: { 1: 12, 2: 25, 3: 98, 4: 264, 5: 390 } },
    stock: 780, sku: 'ROPE-SPD-CB', createdAt: new Date('2024-03-25'), updatedAt: new Date('2024-06-11'), isActive: true, isFeatured: false, vendor: 'FlexFit'
  }
];
