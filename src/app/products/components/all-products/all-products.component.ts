import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product, ProductFilter, ProductPage, Category } from '../../models';
import { CartsService } from '../../../carts/services/carts.service';
import { UiToastComponent } from '../../../shared/ui/components/toast/toast.component';
import { FilterGroup } from '../../../shared/ui/components/filter-panel/filter-panel.component';
import { SortOption } from '../../../shared/ui/components/sort-dropdown/sort-dropdown.component';
import { SORT_OPTIONS, DEFAULT_FILTER_GROUPS, DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../../../shared/data/mock-data';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  private productsService = inject(ProductsService);
  private cartsService = inject(CartsService);
  private route = inject(ActivatedRoute);

  @ViewChild('toast') toast!: UiToastComponent;

  products: Product[] = [];
  categories: Category[] = [];
  isLoading = false;

  currentPage = DEFAULT_CURRENT_PAGE;
  pageSize = DEFAULT_PAGE_SIZE;
  totalProducts = 0;
  totalPages = 0;

  sortBy = 'newest';
  sortOptions: SortOption[] = SORT_OPTIONS;

  filterGroups: FilterGroup[] = [];

  ngOnInit(): void {
    this.initFilterGroups();
    this.loadCategories();
  }

  loadCategories(): void {
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.updateFilterGroups();

        // Apply category from URL param after options are loaded
        this.route.queryParams.subscribe(params => {
          if (params['category']) {
            const categoryFilter = this.filterGroups.find(g => g.id === 'category');
            if (categoryFilter) {
              const matchedCat = this.categories.find(c => c.name.toLowerCase() === params['category'].toLowerCase());
              categoryFilter.currentValue = matchedCat ? matchedCat.id : params['category'];
            }
          }
          this.loadProducts();
        }).add(() => { /* noop: subscription cleanup */ });
      },
      error: () => {
        this.showToast('Error', 'Failed to load categories', 'error');
      }
    });
  }

  initFilterGroups(): void {
    this.filterGroups = DEFAULT_FILTER_GROUPS.map(group => ({ ...group }));
  }

  updateFilterGroups(): void {
    const categoryFilter = this.filterGroups.find(g => g.id === 'category');
    if (categoryFilter) {
      categoryFilter.options = this.categories.map(cat => ({
        value: cat.id,
        label: cat.name
      }));
    }
  }

  onFilterChange(event: { filterId: string; value: unknown }): void {
    const { filterId } = event;

    switch (filterId) {
      case 'category':
      case 'price-range':
      case 'rating':
      case 'stock':
        this.applyFilters();
        break;
    }
  }

  onSortChange(sortValue: string): void {
    this.sortBy = sortValue;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    const categoryGroup = this.filterGroups.find(g => g.id === 'category');
    const priceGroup = this.filterGroups.find(g => g.id === 'price-range');
    const ratingGroup = this.filterGroups.find(g => g.id === 'rating');
    const stockGroup = this.filterGroups.find(g => g.id === 'stock');

    const filter: ProductFilter = {
      categories: categoryGroup?.currentValue ? [categoryGroup.currentValue as string] : undefined,
      minPrice: priceGroup?.currentMin,
      maxPrice: priceGroup?.currentMax,
      rating: (ratingGroup?.currentValue as number) || 0,
      inStock: stockGroup?.currentValue ? !!(stockGroup.currentValue as string[]).includes('in-stock') : undefined,
      sortBy: this.sortBy as ProductFilter['sortBy']
    };

    this.productsService.getProducts(filter, this.currentPage, this.pageSize).subscribe({
      next: (page: ProductPage) => {
        this.products = page.items;
        this.totalProducts = page.total;
        this.totalPages = page.totalPages;
        this.isLoading = false;
      },
      error: () => {
        this.showToast('Error', 'Failed to load products', 'error');
        this.isLoading = false;
      }
    });
  }

  resetFilters(): void {
    this.initFilterGroups();
    this.updateFilterGroups();
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartsService.addToCart({
      productId: product.id,
      quantity: 1
    }).subscribe({
      next: () => {
        this.showToast('Added to cart', `${product.title} has been added to your cart`, 'success');
      },
      error: () => {
        this.showToast('Error', 'Failed to add item to cart', 'error');
      }
    });
  }

  private showToast(title: string, message: string, type: 'success' | 'error' | 'info' | 'warning'): void {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}
