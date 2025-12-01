export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  brand: string;
  category: 'Men' | 'Women' | 'Unisex' | 'Niche' | 'Designer';
  family: 'Floral' | 'Woody' | 'Citrus' | 'Oriental' | 'Fresh' | 'Gourmand';
  price: number;
  salePrice?: number;
  sizes: ProductSize[];
  concentration: 'EDP' | 'EDT' | 'Parfum' | 'Body Mist';
  images: string[];
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  longevity: string;
  sillage: string;
  tags: string[];
  rating: number;
  featured?: boolean;
}

export interface ProductSize {
  sizeMl: number;
  sku: string;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  brand: string;
  image: string;
  size: number;
  concentration: string;
  price: number;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface FilterState {
  categories: string[];
  families: string[];
  concentrations: string[];
  sizes: number[];
  brands: string[];
  priceRange: [number, number];
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}