import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CartsService } from '../../../carts/services/carts.service';
import { Product, Review } from '../../models';
import { UiToastComponent } from '../../../shared/ui/components/toast/toast.component';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html'
})
export class ProductsDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(ProductsService);
  private cartsService = inject(CartsService);

  @ViewChild('toast') toast!: UiToastComponent;

  product: Product | null = null;
  reviews: Review[] = [];
  isLoading = false;
  imgError = false;
  quantity = 1;
  Math = Math;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
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

  loadReviews(productId: string): void {
    this.productsService.getProductReviews(productId).subscribe({
      next: (response) => {
        this.reviews = response.items;
      },
      error: () => {
        // Reviews optional
      }
    });
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product || this.product.stock === 0) return;

    this.cartsService.addToCart({
      productId: this.product.id,
      quantity: this.quantity
    }).subscribe({
      next: () => {
        this.showToast('Added to cart', `${this.product!.title} has been added to your cart`, 'success');
        this.quantity = 1;
      },
      error: () => {
        this.showToast('Error', 'Failed to add item to cart', 'error');
      }
    });
  }

  formatCategory(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  private showToast(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}

