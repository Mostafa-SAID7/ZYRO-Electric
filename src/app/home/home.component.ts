import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, FeaturedProduct, PromoOffer, Feature } from './models';
import { MOCK_CATEGORIES, MOCK_FEATURED_PRODUCTS, MOCK_PROMO_OFFERS, MOCK_FEATURES } from './data/mock-home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = MOCK_CATEGORIES;
  featuredProducts: FeaturedProduct[] = MOCK_FEATURED_PRODUCTS;
  promoOffers: PromoOffer[] = MOCK_PROMO_OFFERS;
  features: Feature[] = MOCK_FEATURES;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCategory(category: Category): void {
    this.router.navigate(['/products'], { queryParams: { category: category.name } });
  }

  goToProduct(productId: string): void {
    this.router.navigate(['/details', productId]);
  }
}
