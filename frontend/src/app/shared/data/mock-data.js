







/**
 * Sort Options for Products
 */
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' }
];

/**
 * Default Filter Groups for Products
 */
export const DEFAULT_FILTER_GROUPS = [
  {
    id: 'category',
    name: 'Category',
    type: 'select',
    options: [],
    currentValue: ''
  },
  {
    id: 'price-range',
    name: 'Price Range',
    type: 'price-range',
    minValue: 0,
    maxValue: 1000,
    currentMin: 0,
    currentMax: 1000
  },
  {
    id: 'rating',
    name: 'Rating',
    type: 'rating',
    currentValue: 0
  },
  {
    id: 'stock',
    name: 'Stock Status',
    type: 'checkbox',
    options: [
      { value: 'in-stock', label: 'In Stock Only' }
    ],
    currentValue: ''
  }
];

/**
 * Default Pagination Settings
 */
export const DEFAULT_PAGE_SIZE = 12;
export const DEFAULT_CURRENT_PAGE = 1;

/**
 * Default Search Placeholder
 */
export const SEARCH_PLACEHOLDER = 'Search products...';
export const SEARCH_DEBOUNCE_MS = 300;
