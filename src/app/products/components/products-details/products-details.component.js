import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { PRODUCT_SERVICE_TOKEN, CART_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html'
})
export class ProductsDetailsComponent  {constructor() { ProductsDetailsComponent.prototype.__init.call(this);ProductsDetailsComponent.prototype.__init2.call(this);ProductsDetailsComponent.prototype.__init3.call(this);ProductsDetailsComponent.prototype.__init4.call(this);ProductsDetailsComponent.prototype.__init5.call(this);ProductsDetailsComponent.prototype.__init6.call(this);ProductsDetailsComponent.prototype.__init7.call(this);ProductsDetailsComponent.prototype.__init8.call(this);ProductsDetailsComponent.prototype.__init9.call(this);ProductsDetailsComponent.prototype.__init10.call(this); }
   __init() {this.route = inject(ActivatedRoute)}
   __init2() {this.router = inject(Router)}
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init3() {this.productsService = inject(PRODUCT_SERVICE_TOKEN)}
   __init4() {this.cartsService = inject(CART_SERVICE_TOKEN)}

  ViewChild('toast') 

  __init5() {this.product = null}
  __init6() {this.reviews = []}
  __init7() {this.isLoading = false}
  __init8() {this.imgError = false}
  __init9() {this.quantity = 1}
  __init10() {this.Math = Math}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/products']);
      return;
    }

    this.isLoading = true;
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loadReviews(id);
        this.isLoading = false;
      },
      error: () => {
        this.showToast('Product not found', 'This product does not exist', 'error');
        this.isLoading = false;
      }
    });
  }

  loadReviews(productId) {
    this.productsService.getProductReviews(productId).subscribe({
      next: (response) => {
        this.reviews = response.items;
      },
      error: () => {
        // Reviews optional
      }
    });
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.product || this.product.stock === 0) return;

    this.cartsService.addToCart({
      productId: this.product.id,
      quantity: this.quantity
    }).subscribe({
      next: () => {
        this.showToast('Added to cart', `${this.product.title} has been added to your cart`, 'success');
        this.quantity = 1;
      },
      error: () => {
        this.showToast('Error', 'Failed to add item to cart', 'error');
      }
    });
  }

  formatCategory(slug) {
    if (!slug) return '';
    return slug
      .split('-')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goBack() {
    this.router.navigate(['/products']);
  }

   showToast(title, message, type) {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}

