import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import productsData from '../data/product-list.json';
import { Product, CartItem, RentalDates, FilterState, SortOption } from '../types';
import { calculateRentalPeriod } from '../utils/dateUtils';

interface RentalContextType {
  // Dates
  rentalDates: RentalDates;
  setRentalDates: (deliveryDate: string | null, pickupDate: string | null) => void;
  clearRentalDates: () => void;
  isDateModalOpen: boolean;
  setIsDateModalOpen: (open: boolean) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateCartQuantity: (productId: string | number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;

  // Wishlist
  wishlist: (string | number)[];
  toggleWishlist: (productId: string | number) => void;
  isWishlisted: (productId: string | number) => boolean;

  // Votes
  votes: Record<string, number>;
  voteProduct: (productId: string | number) => void;
  hasVoted: (productId: string | number) => boolean;

  // Filters
  filters: FilterState;
  setCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSort: (sort: SortOption) => void;
  setTagFilter: (tag: string) => void;
  setInStockOnly: (inStockOnly: boolean) => void;
  resetFilters: () => void;

  // Catalog
  filteredProducts: Product[];
  totalFilteredCount: number;

  // Toast
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

const DATES_STORAGE_KEY = 'sharepal_rental_dates_v1';
const CART_STORAGE_KEY = 'sharepal_cart_v1';
const WISHLIST_STORAGE_KEY = 'sharepal_wishlist_v1';
const VOTES_STORAGE_KEY = 'sharepal_votes_v1';

export const RentalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Rental Dates
  const [rentalDates, setRentalDatesState] = useState<RentalDates>(() => {
    try {
      const saved = localStorage.getItem(DATES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.deliveryDate && parsed.pickupDate) {
          const calc = calculateRentalPeriod(parsed.deliveryDate, parsed.pickupDate);
          return {
            deliveryDate: parsed.deliveryDate,
            pickupDate: parsed.pickupDate,
            days: calc.days,
          };
        }
      }
    } catch {
      // fallback
    }
    return {
      deliveryDate: null,
      pickupDate: null,
      days: 0,
    };
  });

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Wishlist
  const [wishlist, setWishlist] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Votes
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(VOTES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5. Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3200);
  };

  // 6. Filters
  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    searchQuery: '',
    sort: 'popular',
    tag: '',
    inStockOnly: false,
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DATES_STORAGE_KEY, JSON.stringify(rentalDates));
    } catch {
      // ignore
    }
  }, [rentalDates]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
    } catch {
      // ignore
    }
  }, [votes]);

  // Set rental dates
  const setRentalDates = (deliveryDate: string | null, pickupDate: string | null) => {
    if (!deliveryDate || !pickupDate) {
      setRentalDatesState({ deliveryDate: null, pickupDate: null, days: 0 });
      return;
    }
    const calc = calculateRentalPeriod(deliveryDate, pickupDate);
    setRentalDatesState({
      deliveryDate,
      pickupDate,
      days: calc.days,
    });
  };

  const clearRentalDates = () => {
    setRentalDatesState({ deliveryDate: null, pickupDate: null, days: 0 });
  };

  // Cart operations
  const addToCart = (product: Product) => {
    if (product.out_of_stock) {
      showToast(`${product.name} is currently out of stock.`);
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => String(item.product.id) === String(product.id));
      if (existing) {
        return prevCart.map((item) =>
          String(item.product.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId: string | number) => {
    setCart((prev) => prev.filter((item) => String(item.product.id) !== String(productId)));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (productId: string | number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        String(item.product.id) === String(productId) ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart calculations
  const rentalDayMultiplier = rentalDates.days > 0 ? rentalDates.days : 1;
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Math.round(item.product.per_day_rent);
      return sum + price * item.quantity * rentalDayMultiplier;
    }, 0);
  }, [cart, rentalDayMultiplier]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Wishlist
  const toggleWishlist = (productId: string | number) => {
    setWishlist((prev) => {
      const exists = prev.some((id) => String(id) === String(productId));
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => String(id) !== String(productId));
      } else {
        showToast('Added to wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string | number) =>
    wishlist.some((id) => String(id) === String(productId));

  // Votes
  const voteProduct = (productId: string | number) => {
    const key = String(productId);
    setVotes((prev) => {
      const current = prev[key] || 0;
      return {
        ...prev,
        [key]: current + 1,
      };
    });
    showToast('Vote submitted! Thanks for your interest.');
  };

  const hasVoted = (productId: string | number) => (votes[String(productId)] || 0) > 0;

  // Filter setters
  const setCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters((prev) => ({ ...prev, searchQuery }));
  };

  const setSort = (sort: SortOption) => {
    setFilters((prev) => ({ ...prev, sort }));
  };

  const setTagFilter = (tag: string) => {
    setFilters((prev) => ({ ...prev, tag: prev.tag === tag ? '' : tag }));
  };

  const setInStockOnly = (inStockOnly: boolean) => {
    setFilters((prev) => ({ ...prev, inStockOnly }));
  };

  const resetFilters = () => {
    setFilters({
      category: 'All',
      searchQuery: '',
      sort: 'popular',
      tag: '',
      inStockOnly: false,
    });
  };

  // Filtered and sorted products
  const rawProducts = useMemo(() => {
    let list: Product[] = [];
    if (Array.isArray(productsData)) {
      list = productsData as Product[];
    } else if (
      productsData &&
      typeof productsData === 'object' &&
      Array.isArray((productsData as any).products)
    ) {
      list = (productsData as any).products as Product[];
    }
    return list.map((p) => {
      let category = p.category;
      if (!category) {
        const n = p.name.toLowerCase();
        if (n.includes('xbox')) category = 'Xbox Console';
        else if (n.includes('vr') || n.includes('quest')) category = 'VR';
        else if (n.includes('gta')) category = 'GTA VI';
        else category = 'PS5 Console';
      }
      return {
        ...p,
        category,
      };
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...rawProducts];

    // Category filter
    if (filters.category && filters.category !== 'All') {
      const catLower = filters.category.toLowerCase();
      result = result.filter((p) => {
        if (p.category.toLowerCase().includes(catLower)) return true;
        if (catLower.includes('gta') && (p.name.toLowerCase().includes('gta') || p.category.toLowerCase().includes('gta'))) return true;
        if (catLower.includes('ps5') && (p.name.toLowerCase().includes('ps5') || p.category.toLowerCase().includes('ps5'))) return true;
        if (catLower.includes('xbox') && (p.name.toLowerCase().includes('xbox') || p.category.toLowerCase().includes('xbox'))) return true;
        if (catLower.includes('vr') && (p.name.toLowerCase().includes('vr') || p.name.toLowerCase().includes('quest') || p.category.toLowerCase().includes('vr'))) return true;
        return false;
      });
    }

    // Search filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (filters.tag) {
      result = result.filter((p) => p.tag === filters.tag);
    }

    // In-Stock only filter
    if (filters.inStockOnly) {
      result = result.filter((p) => !p.out_of_stock);
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sort) {
        case 'price-asc':
          return a.per_day_rent - b.per_day_rent;
        case 'price-desc':
          return b.per_day_rent - a.per_day_rent;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.booked_count - a.booked_count;
      }
    });

    return result;
  }, [rawProducts, filters]);

  const totalFilteredCount = filteredProducts.length;

  return (
    <RentalContext.Provider
      value={{
        rentalDates,
        setRentalDates,
        clearRentalDates,
        isDateModalOpen,
        setIsDateModalOpen,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        votes,
        voteProduct,
        hasVoted,
        filters,
        setCategory,
        setSearchQuery,
        setSort,
        setTagFilter,
        setInStockOnly,
        resetFilters,
        filteredProducts,
        totalFilteredCount,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = (): RentalContextType => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
