import { Injectable } from '@angular/core';
import { Product } from '../../products/models';
import { IFilterStrategy } from '../interfaces/business-logic';

// Single Responsibility: Handle product filtering only
// DIP: Implements IFilterStrategy interface - depends on abstraction
@Injectable({ providedIn: 'root' })
export class FilterStrategyService implements IFilterStrategy {
  filter(products: Product[], filters: any): Product[] {
    return products.filter(product => {
      if (filters.categories?.length && !filters.categories.includes(product.category)) {
        return false;
      }
      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }
      if (filters.rating !== undefined && (product.rating?.average || 0) < filters.rating) {
        return false;
      }
      if (filters.inStock !== undefined && (product.stock > 0) !== filters.inStock) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }
}
