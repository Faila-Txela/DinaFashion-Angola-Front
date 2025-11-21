export interface ProductFilters {
  colors: string[];
  sizes: string[];
  priceRange: [number, number]; // [minPrice, maxPrice]
}

export interface MainLayoutContext {
  filters: ProductFilters;
  onFilterChange: (key: keyof ProductFilters, value: any) => void; 
}