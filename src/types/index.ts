export interface Product {
  id: string | number;
  name: string;
  category?: string;
  tag: 'Trending' | 'New' | 'Vote to Launch' | '' | string;
  image: string;
  rating: number;
  booked_count: number;
  per_day_rent: number;
  out_of_stock: boolean;
  votes?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RentalDates {
  deliveryDate: string | null; // ISO 'YYYY-MM-DD'
  pickupDate: string | null; // ISO 'YYYY-MM-DD'
  days: number;
  chargeableStart?: string;
  chargeableEnd?: string;
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string; // 'All' | 'GTA VI' | 'PS5 Console' | 'Xbox Console' | 'VR'
  searchQuery: string;
  sort: SortOption;
  tag: string; // '' | 'Trending' | 'New'
  inStockOnly: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  initials: string;
  cityAndCategory: string;
  rating: number;
  avatarBgColor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
