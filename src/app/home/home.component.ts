import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, FeaturedProduct, PromoOffer, Feature } from './models';
import { MOCK_CATEGORIES, MOCK_FEATURED_PRODUCTS, MOCK_PROMO_OFFERS, MOCK_FEATURES } from './data/mock-home';

export interface HeroSlide {
  badge: string;
  badgeIcon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
  bgGradient: string;
  accentColor: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  categories: Category[] = MOCK_CATEGORIES;
  featuredProducts: FeaturedProduct[] = MOCK_FEATURED_PRODUCTS;
  promoOffers: PromoOffer[] = MOCK_PROMO_OFFERS;
  features: Feature[] = MOCK_FEATURES;

  activeSlide = 0;
  private autoPlayInterval: any;

  heroSlides: HeroSlide[] = [
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  goToSlide(index: number): void {
    this.stopAutoPlay();
    this.activeSlide = index;
    this.startAutoPlay();
  }

  nextSlide(): void {
    this.activeSlide = (this.activeSlide + 1) % this.heroSlides.length;
  }

  prevSlide(): void {
    this.activeSlide = (this.activeSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCategory(category: Category): void {
    this.router.navigate(['/products'], { queryParams: { category: category.id } });
  }

  goToProduct(productId: string): void {
    this.router.navigate(['/details', productId]);
  }
}
