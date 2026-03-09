'use client';

import { useAppSelector } from '@/store';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { items: products, loading } = useAppSelector((state) => state.products);
  
  const wishlistProducts = products.filter(product => wishlistItems.includes(product.id));

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Wishlist</h1>
        <ProductGrid products={[]} loading={true} />
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">My Wishlist</h1>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Save your favorite fragrances to your wishlist.</p>
          <Link
            href="/catalog"
            className="btn-primary inline-block"
          >
            Discover Fragrances
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">
          My Wishlist ({wishlistProducts.length})
        </h1>
      </div>

      <ProductGrid products={wishlistProducts} loading={false} />
    </div>
  );
}
