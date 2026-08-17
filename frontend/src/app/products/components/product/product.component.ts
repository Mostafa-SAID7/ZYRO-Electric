import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Product } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private router = inject(Router);

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  Math = Math;
  imgError = false;

  viewDetails(): void {
    this.router.navigate(['/details', this.product.id]);
  }

  addCart(): void {
    if (this.product.stock > 0) {
      this.addToCart.emit(this.product);
    }
  }

  formatCategory(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

