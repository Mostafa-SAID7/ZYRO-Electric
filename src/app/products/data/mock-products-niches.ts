/**
 * ZYRO-Electric: Complete 9-Niche Tech Accessories Database
 *
 * Product Database with 9 Technology Niches:
 * 1. Smartphone Accessories
 * 2. Laptop Accessories
 * 3. Cable Management
 * 4. Desk Tech
 * 5. Smart Device Accessories
 * 6. Charging Accessories
 * 7. Photography Accessories
 * 8. Content Creator Equipment
 * 9. Electronics Organization
 */

import { Product } from '../models';

export const MOCK_PRODUCTS_NICHES: Product[] = [
  // ======================== NICHE 1: SMARTPHONE ACCESSORIES ========================
  {
    id: 'sp-1', title: 'Phone Case Pro',
    description: 'Military-grade protective case for smartphones. Shock absorption, slim design, and premium material. Compatible with all major brands.',
    price: 29.99, originalPrice: 49.99, discount: 40,
    image: '/assets/accessories/phone/phone-case.png',
    images: ['/assets/accessories/phone/phone-case.png'],
    category: 'smartphone-accessories',
    rating: { average: 4.8, count: 2341, distribution: { 1: 15, 2: 30, 3: 98, 4: 620, 5: 1578 } },
    stock: 450, sku: 'SP-CASE-PRO', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'PhoneShield Pro'
  },

  {
    id: 'sp-2', title: 'Tempered Glass Screen Protector',
    description: 'Ultra-clear 9H hardness tempered glass screen protector. Anti-fingerprint coating and easy installation. Preserves touch sensitivity.',
    price: 12.99, originalPrice: 19.99, discount: 35,
    image: 'https://images.unsplash.com/photo-1574375927936-d5370b56e786?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1574375927936-d5370b56e786?w=500&h=500&fit=crop'],
    category: 'smartphone-accessories',
    rating: { average: 4.6, count: 5234, distribution: { 1: 45, 2: 98, 3: 287, 4: 1245, 5: 3559 } },
    stock: 2340, sku: 'SP-GLASS-9H', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'CrystalClear'
  },

  {
    id: 'sp-3', title: 'Phone Ring Stand & Holder',
    description: '360-degree rotating metal ring with strong adhesive. Perfect for hands-free viewing, selfies, and video recording. Adjustable angle.',
    price: 8.99, originalPrice: 14.99, discount: 40,
    image: '/assets/phone/phone-stand.png',
    images: ['/assets/phone/phone-stand.png'],
    category: 'smartphone-accessories',
    rating: { average: 4.7, count: 3456, distribution: { 1: 28, 2: 56, 3: 178, 4: 856, 5: 2338 } },
    stock: 1850, sku: 'SP-RING-STD', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'MobileGear'
  },

  {
    id: 'sp-4', title: 'Wireless Phone Charger Pad',
    description: '15W fast wireless charging pad with LED indicator. Qi-certified for all compatible devices. Non-slip surface and compact design.',
    price: 24.99, originalPrice: 39.99, discount: 38,
    image: '/assets/accessories/phone/phone-charger.png',
    images: ['/assets/accessories/phone/phone-charger.png'],
    category: 'smartphone-accessories',
    rating: { average: 4.5, count: 2789, distribution: { 1: 35, 2: 78, 3: 245, 4: 912, 5: 1519 } },
    stock: 890, sku: 'SP-CHG-15W', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'PowerFlow'
  },

  {
    id: 'sp-5', title: 'Phone Pop Socket Designer',
    description: 'Trendy pop socket with expandable grip. Stylish designs, strong adhesive, and works with most phone cases. Perfect for comfort and style.',
    price: 6.99, originalPrice: 12.99, discount: 46,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=500&h=500&fit=crop'],
    category: 'smartphone-accessories',
    rating: { average: 4.4, count: 4123, distribution: { 1: 52, 2: 145, 3: 456, 4: 1234, 5: 2236 } },
    stock: 3200, sku: 'SP-POP-DES', createdAt: new Date('2024-01-28'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'StyleTech'
  },

  // ======================== NICHE 2: LAPTOP ACCESSORIES ========================
  {
    id: 'lap-1', title: 'Laptop Stand Adjustable Aluminum',
    description: 'Premium adjustable aluminum laptop stand. Ergonomic design reduces neck strain. Compatible with all laptops 10-17 inches. Portable and durable.',
    price: 39.99, originalPrice: 69.99, discount: 43,
    image: '/assets/accessories/laptop/laptop-stand.png',
    images: ['/assets/accessories/laptop/laptop-stand.png'],
    category: 'laptop-accessories',
    rating: { average: 4.9, count: 3456, distribution: { 1: 12, 2: 28, 3: 89, 4: 745, 5: 2582 } },
    stock: 567, sku: 'LAP-STD-ALM', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'ErgoTech'
  },

  {
    id: 'lap-2', title: 'Laptop Cooling Pad with Fans',
    description: 'Advanced cooling pad with 5 quiet fans and USB power. Temperature sensor adjusts fan speed. Perfect for gaming and heavy workloads.',
    price: 34.99, originalPrice: 59.99, discount: 42,
    image: '/assets/laptop/laptop-cooling-pad.png',
    images: ['/assets/laptop/laptop-cooling-pad.png'],
    category: 'laptop-accessories',
    rating: { average: 4.7, count: 2145, distribution: { 1: 22, 2: 45, 3: 134, 4: 678, 5: 1266 } },
    stock: 423, sku: 'LAP-COOL-5F', createdAt: new Date('2024-02-05'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'CoolTech'
  },

  {
    id: 'lap-3', title: 'USB-C Docking Station 7-in-1',
    description: 'Complete docking solution with 7 ports: HDMI, USB 3.0, USB 2.0, SD card, 3.5mm audio, USB-C charge. 100W power delivery.',
    price: 49.99, originalPrice: 89.99, discount: 44,
    image: '/assets/laptop/laptop-dock.png',
    images: ['/assets/laptop/laptop-dock.png'],
    category: 'laptop-accessories',
    rating: { average: 4.8, count: 1876, distribution: { 1: 18, 2: 34, 3: 98, 4: 612, 5: 1114 } },
    stock: 234, sku: 'LAP-DOCK-7', createdAt: new Date('2024-01-22'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'ConnectPro'
  },

  {
    id: 'lap-4', title: 'Laptop Sleeve Case 15 inch',
    description: 'Protective neoprene laptop sleeve with padding. Water-resistant material, soft interior, and portable design. Fits 15-inch laptops.',
    price: 18.99, originalPrice: 34.99, discount: 46,
    image: '/assets/laptop/laptop-bag.png',
    images: ['/assets/laptop/laptop-bag.png'],
    category: 'laptop-accessories',
    rating: { average: 4.6, count: 2341, distribution: { 1: 30, 2: 67, 3: 210, 4: 834, 5: 1200 } },
    stock: 780, sku: 'LAP-SLEV-15', createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'ProtectCase'
  },

  {
    id: 'lap-5', title: 'External SSD 1TB USB-C',
    description: '1TB portable SSD with USB-C. 520MB/s read speed, compact design, and military-grade shock resistance. Ideal for professionals and creators.',
    price: 89.99, originalPrice: 149.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop'],
    category: 'laptop-accessories',
    rating: { average: 4.8, count: 1567, distribution: { 1: 15, 2: 28, 3: 78, 4: 456, 5: 990 } },
    stock: 345, sku: 'LAP-SSD-1TB', createdAt: new Date('2024-01-30'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'StoragePro'
  },

  // ======================== NICHE 3: CABLE MANAGEMENT ========================
  {
    id: 'cable-1', title: 'Cable Organizer Clips Set',
    description: 'Adhesive cable clips for organizing cables. Keep wires neat and organized behind desk. Reusable silicone material, pack of 10.',
    price: 9.99, originalPrice: 19.99, discount: 50,
    image: '/assets/collections/collection-cable-management.png',
    images: ['/assets/collections/collection-cable-management.png'],
    category: 'cable-management',
    rating: { average: 4.7, count: 5678, distribution: { 1: 28, 2: 78, 3: 234, 4: 1456, 5: 3882 } },
    stock: 4500, sku: 'CABLE-CLIP-10', createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'OrganizerPro'
  },

  {
    id: 'cable-2', title: 'Cable Management Box',
    description: 'Sleek cable management box for organizing power cables and chargers. Keeps desk clutter-free. Holds multiple large cables securely.',
    price: 14.99, originalPrice: 24.99, discount: 40,
    image: '/assets/collections/collection-cable-management.png',
    images: ['/assets/collections/collection-cable-management.png'],
    category: 'cable-management',
    rating: { average: 4.8, count: 3245, distribution: { 1: 15, 2: 35, 3: 98, 4: 834, 5: 2263 } },
    stock: 1200, sku: 'CABLE-BOX-01', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'DeskOrganize'
  },

  {
    id: 'cable-3', title: 'Velcro Cable Ties Premium',
    description: 'Reusable velcro cable ties (10 pack). Strong adhesive, won\'t damage cables. Perfect for organizing any cable arrangement.',
    price: 7.99, originalPrice: 12.99, discount: 38,
    image: 'https://images.unsplash.com/photo-1583863788434-e62bd8abe37b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1583863788434-e62bd8abe37b?w=500&h=500&fit=crop'],
    category: 'cable-management',
    rating: { average: 4.9, count: 6123, distribution: { 1: 12, 2: 24, 3: 67, 4: 1234, 5: 4786 } },
    stock: 3400, sku: 'CABLE-VELC-10', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'VelcroMax'
  },

  {
    id: 'cable-4', title: 'USB Cable Organizer Holder',
    description: 'Desktop USB cable organizer with 6 slots. Keeps cables tidy and accessible. Rubber feet prevent slipping. Perfect for desk setup.',
    price: 11.99, originalPrice: 19.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=500&h=500&fit=crop'],
    category: 'cable-management',
    rating: { average: 4.6, count: 2876, distribution: { 1: 32, 2: 67, 3: 189, 4: 867, 5: 1721 } },
    stock: 890, sku: 'CABLE-HOLD-6S', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'CableKeep'
  },

  {
    id: 'cable-5', title: 'Desk Cable Channel 10ft',
    description: 'Adhesive cable channel for neat desk setup. Holds up to 8 cables, paintable PVC material, and 10 feet of coverage. Easy installation.',
    price: 13.99, originalPrice: 23.99, discount: 42,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=500&h=500&fit=crop'],
    category: 'cable-management',
    rating: { average: 4.7, count: 1876, distribution: { 1: 20, 2: 45, 3: 123, 4: 678, 5: 1010 } },
    stock: 456, sku: 'CABLE-CHNL-10', createdAt: new Date('2024-01-18'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'ChannelOrganize'
  },

  // ======================== NICHE 4: DESK TECH ========================
  {
    id: 'desk-1', title: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with Cherry MX switches. Programmable RGB lighting, aluminum frame, and hot-swappable keys.',
    price: 129.99, originalPrice: 199.99, discount: 35,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop'],
    category: 'desk-tech',
    rating: { average: 4.8, count: 3456, distribution: { 1: 18, 2: 34, 3: 98, 4: 789, 5: 2517 } },
    stock: 345, sku: 'DESK-KB-RGB', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'KeyMaster Pro'
  },

  {
    id: 'desk-2', title: '4K USB-C Monitor 27 inch',
    description: '27-inch 4K monitor with USB-C input, 90W power delivery, and HDR 400. Perfect for creative professionals and multitaskers.',
    price: 399.99, originalPrice: 599.99, discount: 33,
    image: '/assets/laptop/laptop-external-monitor.png',
    images: ['/assets/laptop/laptop-external-monitor.png'],
    category: 'desk-tech',
    rating: { average: 4.9, count: 1234, distribution: { 1: 8, 2: 15, 3: 45, 4: 345, 5: 821 } },
    stock: 123, sku: 'DESK-MON-4K', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'MonitorPro'
  },

  {
    id: 'desk-3', title: 'Desk Lamp LED with USB',
    description: 'Smart LED desk lamp with USB charging port, 5 brightness levels, and wireless charging base. Perfect for home office.',
    price: 44.99, originalPrice: 69.99, discount: 36,
    image: 'https://images.unsplash.com/photo-1565636192335-14f80859aef2?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1565636192335-14f80859aef2?w=500&h=500&fit=crop'],
    category: 'desk-tech',
    rating: { average: 4.7, count: 2123, distribution: { 1: 22, 2: 45, 3: 134, 4: 678, 5: 1244 } },
    stock: 567, sku: 'DESK-LAMP-L', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'LightTech'
  },

  {
    id: 'desk-4', title: 'Gaming Mouse Pro 25K DPI',
    description: 'High-precision gaming mouse with 25K DPI sensor, 8 programmable buttons, and 70-hour battery life. RGB lighting.',
    price: 59.99, originalPrice: 99.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop'],
    category: 'desk-tech',
    rating: { average: 4.8, count: 2876, distribution: { 1: 15, 2: 32, 3: 89, 4: 834, 5: 1906 } },
    stock: 456, sku: 'DESK-MOUSE-25K', createdAt: new Date('2024-02-05'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'MouseMaster'
  },

  {
    id: 'desk-5', title: 'Desk Organizer Multi-Tier',
    description: 'Bamboo desk organizer with multiple compartments for pens, papers, and accessories. Eco-friendly and stylish design.',
    price: 24.99, originalPrice: 39.99, discount: 38,
    image: '/assets/collections/collection-desk-tech.png',
    images: ['/assets/collections/collection-desk-tech.png'],
    category: 'desk-tech',
    rating: { average: 4.6, count: 1567, distribution: { 1: 28, 2: 56, 3: 167, 4: 645, 5: 671 } },
    stock: 789, sku: 'DESK-ORG-MT', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'DeskStyle'
  },

  // ======================== NICHE 5: SMART DEVICE ACCESSORIES ========================
  {
    id: 'smart-1', title: 'Smart Speaker Mount Wall',
    description: 'Adjustable wall mount for smart speakers. Works with Echo, Google Home, and other devices. Aluminum alloy construction.',
    price: 16.99, originalPrice: 29.99, discount: 43,
    image: '/assets/collections/collection-smart-devices.png',
    images: ['/assets/collections/collection-smart-devices.png'],
    category: 'smart-device-accessories',
    rating: { average: 4.7, count: 2341, distribution: { 1: 20, 2: 45, 3: 123, 4: 834, 5: 1319 } },
    stock: 890, sku: 'SMART-MNT-W', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'SmartMount'
  },

  {
    id: 'smart-2', title: 'Smart Hub Multi-Device Controller',
    description: 'Universal smart home hub for controlling multiple IoT devices. Compatible with Alexa, Google, and Apple ecosystems.',
    price: 69.99, originalPrice: 119.99, discount: 42,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500&h=500&fit=crop'],
    category: 'smart-device-accessories',
    rating: { average: 4.8, count: 1876, distribution: { 1: 12, 2: 28, 3: 78, 4: 612, 5: 1146 } },
    stock: 234, sku: 'SMART-HUB-M', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'SmartHub Pro'
  },

  {
    id: 'smart-3', title: 'Wireless Charging Pad Multi-Device',
    description: '3-in-1 wireless charging pad for phones, earbuds, and smartwatches. Qi-certified, fast charging, LED indicator.',
    price: 34.99, originalPrice: 59.99, discount: 42,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop'],
    category: 'smart-device-accessories',
    rating: { average: 4.6, count: 3245, distribution: { 1: 32, 2: 67, 3: 189, 4: 945, 5: 2012 } },
    stock: 678, sku: 'SMART-CHRG-3', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'ChargeWave'
  },

  {
    id: 'smart-4', title: 'Smart Plug WiFi Outlet',
    description: 'WiFi-enabled smart plug for remote control and scheduling. Works with Alexa and Google Home. Energy monitoring feature.',
    price: 14.99, originalPrice: 24.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1577909647770-cb4243f8c5cb?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1577909647770-cb4243f8c5cb?w=500&h=500&fit=crop'],
    category: 'smart-device-accessories',
    rating: { average: 4.5, count: 4567, distribution: { 1: 45, 2: 98, 3: 287, 4: 1234, 5: 2903 } },
    stock: 1200, sku: 'SMART-PLUG-W', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'SmartPlug'
  },

  {
    id: 'smart-5', title: 'IoT Motion Sensor Detector',
    description: 'Smart motion sensor for home automation. Detects movement, triggers lights or alarms. WiFi connected with app control.',
    price: 24.99, originalPrice: 39.99, discount: 38,
    image: '/assets/tablet/tablet-stand.png',
    images: ['/assets/tablet/tablet-stand.png'],
    category: 'smart-device-accessories',
    rating: { average: 4.7, count: 1823, distribution: { 1: 18, 2: 34, 3: 98, 4: 612, 5: 1061 } },
    stock: 456, sku: 'SMART-MOTION', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'SmartSense'
  },

  // ======================== NICHE 6: CHARGING ACCESSORIES ========================
  {
    id: 'charge-1', title: 'USB-C Fast Charger 65W',
    description: 'GaN technology fast charger with 65W output. Charges multiple devices simultaneously. Compact and portable design.',
    price: 39.99, originalPrice: 69.99, discount: 43,
    image: '/assets/accessories/phone/phone-charger.png',
    images: ['/assets/accessories/phone/phone-charger.png'],
    category: 'charging-accessories',
    rating: { average: 4.8, count: 4567, distribution: { 1: 22, 2: 45, 3: 134, 4: 1234, 5: 3132 } },
    stock: 1200, sku: 'CHARGE-USB-65W', createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'ChargePro'
  },

  {
    id: 'charge-2', title: 'Portable Power Bank 30000mAh',
    description: '30000mAh portable power bank with dual USB-C and USB-A ports. 22.5W fast charging. LED display shows remaining battery.',
    price: 49.99, originalPrice: 79.99, discount: 38,
    image: 'https://images.unsplash.com/photo-1609042231693-86f68e26f3b2?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1609042231693-86f68e26f3b2?w=500&h=500&fit=crop'],
    category: 'charging-accessories',
    rating: { average: 4.7, count: 3456, distribution: { 1: 28, 2: 56, 3: 167, 4: 945, 5: 2260 } },
    stock: 678, sku: 'CHARGE-BANK-30K', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'PowerBank Pro'
  },

  {
    id: 'charge-3', title: 'Lightning Cable Braided Apple',
    description: 'MFi-certified Lightning cable with nylon braiding. Durable and reliable, compatible with all Apple devices. 6ft length.',
    price: 12.99, originalPrice: 19.99, discount: 35,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop'],
    category: 'charging-accessories',
    rating: { average: 4.6, count: 5678, distribution: { 1: 34, 2: 78, 3: 234, 4: 1456, 5: 3876 } },
    stock: 2340, sku: 'CHARGE-LT-6FT', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'CablePro'
  },

  {
    id: 'charge-4', title: 'Solar Power Bank 26800mAh',
    description: 'Solar-powered power bank for outdoor adventures. 26800mAh capacity, dual USB ports, waterproof design.',
    price: 44.99, originalPrice: 74.99, discount: 40,
    image: 'https://images.unsplash.com/photo-1593642632814-a7db2f9b5f2b?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1593642632814-a7db2f9b5f2b?w=500&h=500&fit=crop'],
    category: 'charging-accessories',
    rating: { average: 4.5, count: 2123, distribution: { 1: 45, 2: 89, 3: 245, 4: 567, 5: 1177 } },
    stock: 345, sku: 'CHARGE-SOLAR-26K', createdAt: new Date('2024-01-28'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'SolarCharge'
  },

  {
    id: 'charge-5', title: 'Multi-Port USB Charger Hub',
    description: '6-port USB charging station. Delivers 60W total power. Perfect for home or office with multiple device chargers.',
    price: 29.99, originalPrice: 49.99, discount: 40,
    image: '/assets/collections/collection-charging-accessories.jpg',
    images: ['/assets/collections/collection-charging-accessories.jpg'],
    category: 'charging-accessories',
    rating: { average: 4.7, count: 2876, distribution: { 1: 20, 2: 45, 3: 134, 4: 834, 5: 1843 } },
    stock: 567, sku: 'CHARGE-HUB-6P', createdAt: new Date('2024-02-05'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'ChargeHub'
  },

  // ======================== NICHE 7: PHOTOGRAPHY ACCESSORIES ========================
  {
    id: 'photo-1', title: 'Camera Tripod Professional',
    description: 'Sturdy aluminum tripod with ball head and quick-release plate. Supports up to 13 lbs. Compact and lightweight for travel.',
    price: 69.99, originalPrice: 119.99, discount: 42,
    image: '/assets/accessories/camera/camera-tripod.png',
    images: ['/assets/accessories/camera/camera-tripod.png'],
    category: 'photography-accessories',
    rating: { average: 4.8, count: 2341, distribution: { 1: 15, 2: 32, 3: 98, 4: 734, 5: 1462 } },
    stock: 345, sku: 'PHOTO-TRIPOD-P', createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'PhotographyPro'
  },

  {
    id: 'photo-2', title: 'LED Ring Light Studio',
    description: '18-inch LED ring light with stand. Adjustable brightness and color temperature. Perfect for makeup, streaming, and product photography.',
    price: 59.99, originalPrice: 99.99, discount: 40,
    image: '/assets/accessories/camera/ring-light.png',
    images: ['/assets/accessories/camera/ring-light.png'],
    category: 'photography-accessories',
    rating: { average: 4.7, count: 3456, distribution: { 1: 22, 2: 45, 3: 134, 4: 945, 5: 2310 } },
    stock: 567, sku: 'PHOTO-RING-18', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'StudioLight Pro'
  },

  {
    id: 'photo-3', title: 'Camera Lens Filter Kit',
    description: 'Complete filter kit with UV, polarizing, and ND filters. Includes lens cap and carrying case. Fits 58mm threads.',
    price: 34.99, originalPrice: 59.99, discount: 42,
    image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop'],
    category: 'photography-accessories',
    rating: { average: 4.6, count: 1876, distribution: { 1: 28, 2: 56, 3: 189, 4: 612, 5: 991 } },
    stock: 890, sku: 'PHOTO-FILTER-58', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'FilterPro'
  },

  {
    id: 'photo-4', title: 'Camera Macro Lens Extension Tube',
    description: 'Metal extension tube set for macro photography. Allows closer focusing without additional lenses. Universal fit.',
    price: 24.99, originalPrice: 39.99, discount: 38,
    image: '/assets/accessories/camera/macro-lens.png',
    images: ['/assets/accessories/camera/macro-lens.png'],
    category: 'photography-accessories',
    rating: { average: 4.5, count: 1234, distribution: { 1: 32, 2: 67, 3: 178, 4: 456, 5: 501 } },
    stock: 456, sku: 'PHOTO-MACRO-EXT', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'MacroTech'
  },

  {
    id: 'photo-5', title: 'Camera Gimbal Stabilizer',
    description: 'Compact camera gimbal for smooth video recording. 3-axis stabilization, app control, and 12-hour battery life.',
    price: 149.99, originalPrice: 249.99, discount: 40,
    image: '/assets/camera/camera-gimbal.png',
    images: ['/assets/camera/camera-gimbal.png'],
    category: 'photography-accessories',
    rating: { average: 4.8, count: 876, distribution: { 1: 12, 2: 23, 3: 67, 4: 289, 5: 485 } },
    stock: 123, sku: 'PHOTO-GIMBAL-3A', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'GimbalPro'
  },

  // ======================== NICHE 8: CONTENT CREATOR EQUIPMENT ========================
  {
    id: 'creator-1', title: 'USB Condenser Microphone Studio',
    description: 'Professional USB microphone with cardioid pattern. Built-in pop filter, adjustable stand, and zero-latency monitoring.',
    price: 99.99, originalPrice: 169.99, discount: 41,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504c04?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1516321318423-f06f70504c04?w=500&h=500&fit=crop'],
    category: 'content-creator-equipment',
    rating: { average: 4.9, count: 4567, distribution: { 1: 12, 2: 28, 3: 89, 4: 1234, 5: 3204 } },
    stock: 567, sku: 'CREATOR-MIC-USB', createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'StudioMic Pro'
  },

  {
    id: 'creator-2', title: '4K Streaming Webcam',
    description: '4K Ultra HD streaming webcam with autofocus, low-light correction, and built-in stereo mic. Plug and play USB.',
    price: 129.99, originalPrice: 199.99, discount: 35,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop'],
    category: 'content-creator-equipment',
    rating: { average: 4.8, count: 2876, distribution: { 1: 18, 2: 34, 3: 98, 4: 834, 5: 1892 } },
    stock: 234, sku: 'CREATOR-CAM-4K', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'WebcamPro'
  },

  {
    id: 'creator-3', title: 'Green Screen Backdrop Kit',
    description: 'Portable green screen kit with collapsible frame and adjustable height. Includes carrying bag for easy transport.',
    price: 79.99, originalPrice: 139.99, discount: 43,
    image: '/assets/collections/collection-content-creator-equipment.jpg',
    images: ['/assets/collections/collection-content-creator-equipment.jpg'],
    category: 'content-creator-equipment',
    rating: { average: 4.7, count: 1567, distribution: { 1: 22, 2: 45, 3: 134, 4: 612, 5: 754 } },
    stock: 345, sku: 'CREATOR-SCREEN-GRN', createdAt: new Date('2024-02-05'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: false, vendor: 'ScreenStudio'
  },

  {
    id: 'creator-4', title: 'XLR Audio Interface 2-in-2-out',
    description: 'Compact USB audio interface with 2 XLR inputs and 2 outputs. 24-bit/192kHz resolution for professional audio quality.',
    price: 149.99, originalPrice: 249.99, discount: 40,
    image: '/assets/collections/collection-content-creator-equipment.jpg',
    images: ['/assets/collections/collection-content-creator-equipment.jpg'],
    category: 'content-creator-equipment',
    rating: { average: 4.8, count: 987, distribution: { 1: 15, 2: 28, 3: 67, 4: 345, 5: 532 } },
    stock: 123, sku: 'CREATOR-AUDIO-2I2O', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'AudioInterface Pro'
  },

  {
    id: 'creator-5', title: 'Studio Monitor Lights LED Panel',
    description: '2x RGB LED light panel for studio setup. Wireless control, adjustable intensity and color. Professional video production quality.',
    price: 189.99, originalPrice: 319.99, discount: 41,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop'],
    category: 'content-creator-equipment',
    rating: { average: 4.9, count: 654, distribution: { 1: 8, 2: 15, 3: 45, 4: 200, 5: 386 } },
    stock: 89, sku: 'CREATOR-LIGHTS-RGB', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-12'),
    isActive: true, isFeatured: true, vendor: 'LightStudio Pro'
  },

  // ======================== NICHE 9: ELECTRONICS ORGANIZATION ========================
  {
    id: 'org-1', title: 'Cable Storage Box Organizer',
    description: 'Desktop cable storage box with rubber grommets. Keeps cables, chargers, and adapters organized and hidden. Sleek design.',
    price: 14.99, originalPrice: 24.99, discount: 40,
    image: '/assets/accessories/tablet/tablet-organizer.png',
    images: ['/assets/accessories/tablet/tablet-organizer.png'],
    category: 'electronics-organization',
    rating: { average: 4.7, count: 3456, distribution: { 1: 20, 2: 45, 3: 134, 4: 945, 5: 2312 } },
    stock: 890, sku: 'ORG-CABLE-BOX', createdAt: new Date('2024-01-12'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: true, vendor: 'OrganizerPro'
  },

  {
    id: 'org-2', title: 'Under-Desk Cable Tray',
    description: 'Adhesive cable tray for under-desk organization. Aluminum construction, holds multiple cables, and improves cable management.',
    price: 19.99, originalPrice: 34.99, discount: 43,
    image: '/assets/collections/collection-electronics-organization.jpg',
    images: ['/assets/collections/collection-electronics-organization.jpg'],
    category: 'electronics-organization',
    rating: { average: 4.8, count: 2341, distribution: { 1: 15, 2: 32, 3: 98, 4: 834, 5: 1362 } },
    stock: 567, sku: 'ORG-TRAY-DESK', createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'DeskOrganize'
  },

  {
    id: 'org-3', title: 'Wall-Mount Router Holder',
    description: 'Secure router holder for wall mounting. Reduces clutter, improves WiFi signal, and keeps equipment organized.',
    price: 12.99, originalPrice: 21.99, discount: 41,
    image: 'https://images.unsplash.com/photo-1606167149433-e27f6b0c89b6?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1606167149433-e27f6b0c89b6?w=500&h=500&fit=crop'],
    category: 'electronics-organization',
    rating: { average: 4.6, count: 1876, distribution: { 1: 28, 2: 56, 3: 189, 4: 612, 5: 991 } },
    stock: 678, sku: 'ORG-ROUTER-MNT', createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'MountPro'
  },

  {
    id: 'org-4', title: 'Charger Station Multi-Device',
    description: 'Multi-device charging station organizer. Holds up to 6 chargers, prevents tangling, and looks sleek on any desk.',
    price: 21.99, originalPrice: 36.99, discount: 41,
    image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=500&h=500&fit=crop',
    images: ['https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=500&h=500&fit=crop'],
    category: 'electronics-organization',
    rating: { average: 4.7, count: 2123, distribution: { 1: 22, 2: 45, 3: 123, 4: 678, 5: 1255 } },
    stock: 456, sku: 'ORG-CHARGE-STATION', createdAt: new Date('2024-01-25'), updatedAt: new Date('2024-06-10'),
    isActive: true, isFeatured: true, vendor: 'ChargeOrganize'
  },

  {
    id: 'org-5', title: 'Cable Labels & Tags Organizer',
    description: 'Reusable silicone cable labels with permanent marker. Keeps cables organized and identifiable. Pack of 20 labels.',
    price: 8.99, originalPrice: 14.99, discount: 40,
    image: '/assets/collections/collection-cable-management.png',
    images: ['/assets/collections/collection-cable-management.png'],
    category: 'electronics-organization',
    rating: { average: 4.8, count: 3876, distribution: { 1: 18, 2: 34, 3: 98, 4: 1234, 5: 2492 } },
    stock: 1200, sku: 'ORG-LABELS-20', createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-06-11'),
    isActive: true, isFeatured: false, vendor: 'LabelPro'
  }
];

// Export comprehensive product database with all 9 niches
export const MOCK_PRODUCTS_ALL_NICHES = MOCK_PRODUCTS_NICHES;
