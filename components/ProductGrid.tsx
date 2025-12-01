import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="aspect-square bg-gray-200 skeleton"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded skeleton w-1/2"></div>
        <div className="h-5 bg-gray-200 rounded skeleton w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded skeleton w-1/3"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-200 rounded-full skeleton w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full skeleton w-16"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded skeleton w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded skeleton w-1/3"></div>
      </div>
    </div>
  );
}

// memoize skeleton for stable identity
const MemoProductSkeleton = React.memo(ProductSkeleton);

 function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <MemoProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No fragrances found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default React.memo(ProductGrid);