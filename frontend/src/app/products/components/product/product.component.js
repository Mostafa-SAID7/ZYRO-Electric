import { EventEmitter, inject } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {constructor() { ProductComponent.prototype.__init.call(this);ProductComponent.prototype.__init2.call(this);ProductComponent.prototype.__init3.call(this);ProductComponent.prototype.__init4.call(this); }
   __init() {this.router = inject(Router)}

  Input() 
  Output() __init2() {this.addToCart = new EventEmitter()}

  __init3() {this.Math = Math}
  __init4() {this.imgError = false}

  viewDetails() {
    this.router.navigate(['/details', this.product.id]);
  }

  addCart() {
    if (this.product.stock > 0) {
      this.addToCart.emit(this.product);
    }
  }

  formatCategory(slug) {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

