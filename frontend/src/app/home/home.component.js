

import { MOCK_CATEGORIES, MOCK_FEATURED_PRODUCTS, MOCK_PROMO_OFFERS, MOCK_FEATURES, MOCK_HERO_SLIDES } from './data/mock-home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {constructor() { HomeComponent.prototype.__init.call(this);HomeComponent.prototype.__init2.call(this);HomeComponent.prototype.__init3.call(this);HomeComponent.prototype.__init4.call(this);HomeComponent.prototype.__init5.call(this); }
  __init() {this.categories = MOCK_CATEGORIES}
  __init2() {this.featuredProducts = MOCK_FEATURED_PRODUCTS}
  __init3() {this.promoOffers = MOCK_PROMO_OFFERS}
  __init4() {this.features = MOCK_FEATURES}
  __init5() {this.heroSlides = MOCK_HERO_SLIDES}
}
