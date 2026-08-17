import { inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent {constructor() { FeaturedProductsComponent.prototype.__init.call(this);FeaturedProductsComponent.prototype.__init2.call(this); }
   __init() {this.router = inject(Router)}

  Input() __init2() {this.featuredProducts = []}

  goToProduct(productId) {
    this.router.navigate(['/details', productId]);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }
}
