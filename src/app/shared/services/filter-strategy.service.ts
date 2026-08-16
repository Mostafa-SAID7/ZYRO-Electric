import { Injectable } from '@angular/core';
import { Product, ProductFilter } from '../../models';

// Single Responsibility: Handle product filtering only
@Injectable({ providedIn: 'root' })
export class FilterStrategyService {
  filter(products: Product[], filters: ProductFilter): Product[] {
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
      if (filters.rating !== undefined && (product.rating || 0) < filters.rating) {
        return false;
      }
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }
}
