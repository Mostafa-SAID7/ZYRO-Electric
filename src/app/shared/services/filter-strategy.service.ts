import { Injectable } from '@angular/core';
import { Product } from '../../products/models';

// Single Responsibility: Handle product filtering only
@Injectable({ providedIn: 'root' })
export class FilterStrategyService {
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
