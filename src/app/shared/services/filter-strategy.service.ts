import { Injectable } from '@angular/core';
import { Product } from '../../products/models';
import { IFilterStrategy } from '../interfaces/business-logic';

// Single Responsibility: Handle product filtering only
// DIP: Implements IFilterStrategy interface - depends on abstraction
@Injectable({ providedIn: 'root' })
export class FilterStrategyService implements IFilterStrategy {
  filter(products: Product[], filters: unknown): Product[] {
    const f = filters as Record<string, unknown>;
    return products.filter(product => {
      if (f.categories && Array.isArray(f.categories) && f.categories.length > 0 && !f.categories.includes(product.category)) {
        return false;
      }
      if (typeof f.minPrice === 'number' && product.price < f.minPrice) {
        return false;
      }
      if (typeof f.maxPrice === 'number' && product.price > f.maxPrice) {
        return false;
      }
      if (typeof f.rating === 'number' && (product.rating?.average || 0) < f.rating) {
        return false;
      }
      if (f.inStock !== undefined && (product.stock > 0) !== f.inStock) {
        return false;
      }
      if (typeof f.searchQuery === 'string' && f.searchQuery) {
        const query = f.searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }
}
