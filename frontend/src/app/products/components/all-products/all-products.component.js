 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';




import { SORT_OPTIONS, DEFAULT_FILTER_GROUPS, DEFAULT_PAGE_SIZE, DEFAULT_CURRENT_PAGE } from '../../../shared/data/mock-data';
import { PRODUCT_SERVICE_TOKEN, CART_SERVICE_TOKEN } from '../../../shared/interfaces/dependency-injection';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent  {constructor() { AllProductsComponent.prototype.__init.call(this);AllProductsComponent.prototype.__init2.call(this);AllProductsComponent.prototype.__init3.call(this);AllProductsComponent.prototype.__init4.call(this);AllProductsComponent.prototype.__init5.call(this);AllProductsComponent.prototype.__init6.call(this);AllProductsComponent.prototype.__init7.call(this);AllProductsComponent.prototype.__init8.call(this);AllProductsComponent.prototype.__init9.call(this);AllProductsComponent.prototype.__init10.call(this);AllProductsComponent.prototype.__init11.call(this);AllProductsComponent.prototype.__init12.call(this);AllProductsComponent.prototype.__init13.call(this); }
  // DIP: Inject via tokens (abstraction), not concrete classes
   __init() {this.productsService = inject(PRODUCT_SERVICE_TOKEN)}
   __init2() {this.cartsService = inject(CART_SERVICE_TOKEN)}
   __init3() {this.route = inject(ActivatedRoute)}

  ViewChild('toast') 

  __init4() {this.products = []}
  __init5() {this.categories = []}
  __init6() {this.isLoading = false}

  __init7() {this.currentPage = DEFAULT_CURRENT_PAGE}
  __init8() {this.pageSize = DEFAULT_PAGE_SIZE}
  __init9() {this.totalProducts = 0}
  __init10() {this.totalPages = 0}

  __init11() {this.sortBy = 'newest'}
  __init12() {this.sortOptions = SORT_OPTIONS}

  __init13() {this.filterGroups = []}

  ngOnInit() {
    this.initFilterGroups();
    this.loadCategories();
  }

  loadCategories() {
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

  initFilterGroups() {
    this.filterGroups = DEFAULT_FILTER_GROUPS.map(group => ({ ...group }));
  }

  updateFilterGroups() {
    const categoryFilter = this.filterGroups.find(g => g.id === 'category');
    if (categoryFilter) {
      categoryFilter.options = this.categories.map(cat => ({
        value: cat.id,
        label: cat.name
      }));
    }
  }

  onFilterChange(event) {
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

  onSortChange(sortValue) {
    this.sortBy = sortValue;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page) {
    this.currentPage = page;
    this.loadProducts();
  }

  applyFilters() {
    this.currentPage = 1;
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    const categoryGroup = this.filterGroups.find(g => g.id === 'category');
    const priceGroup = this.filterGroups.find(g => g.id === 'price-range');
    const ratingGroup = this.filterGroups.find(g => g.id === 'rating');
    const stockGroup = this.filterGroups.find(g => g.id === 'stock');

    const filter = {
      categories: _optionalChain([categoryGroup, 'optionalAccess', _ => _.currentValue]) ? [categoryGroup.currentValue ] : undefined,
      minPrice: _optionalChain([priceGroup, 'optionalAccess', _2 => _2.currentMin]),
      maxPrice: _optionalChain([priceGroup, 'optionalAccess', _3 => _3.currentMax]),
      rating: (_optionalChain([ratingGroup, 'optionalAccess', _4 => _4.currentValue]) ) || 0,
      inStock: _optionalChain([stockGroup, 'optionalAccess', _5 => _5.currentValue]) ? !!(stockGroup.currentValue ).includes('in-stock') : undefined,
      sortBy: this.sortBy 
    };

    this.productsService.getProducts(filter, this.currentPage, this.pageSize).subscribe({
      next: (page) => {
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

  resetFilters() {
    this.initFilterGroups();
    this.updateFilterGroups();
    this.sortBy = 'newest';
    this.currentPage = 1;
    this.applyFilters();
  }

  addToCart(product) {
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

   showToast(title, message, type) {
    this.toast.type = type;
    this.toast.title = title;
    this.toast.message = message;
    this.toast.show();
  }
}
