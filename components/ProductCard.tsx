"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { addItem } from "@/store/slices/cartSlice";
import { toggleWishlistItem } from "@/store/slices/wishlistSlice";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import NotesBadge from "./NotesBadge";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isLiked = wishlistItems.includes(product.id);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const dispatch = useAppDispatch();

  const handleQuickAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault(); // Browser ka default action (jaise link open hona ya form submit) stop karta hai
      e.stopPropagation(); // Event ko parent element tak bubble hone se rokta hai (Link click trigger nahi hota)

      dispatch(
        addItem({
          id: `${product.id}-${selectedSize.sizeMl}`,
          productId: product.id,
          title: product.title,
          brand: product.brand,
          image: product.images[0],
          size: selectedSize.sizeMl,
          concentration: product.concentration,
          price: selectedSize.price,
        })
      );
    },
    [dispatch, product, selectedSize]
  );

  const handleLike = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(toggleWishlistItem(product.id));
    },
    [dispatch, product.id]
  );

  const hasDiscount = !!product.salePrice;

  return (
    <div className="group relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/catalog/${product.slug}`}>
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Sale
            </div>
          )}

          {/* Like button */}
          <button
            onClick={handleLike}
            className="absolute top-2 right-2 p-2 bg-white/70 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isLiked ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Quick add button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              aria-label={`Add ${selectedSize.sizeMl}ml ${product.title} to cart`}
            >
              <ShoppingBagIcon className="h-4 w-4" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-sm font-semibold text-gray-600 mb-1">
            {product.brand}
          </p>

          {/* Title */}
          <h3 className="font-serif font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.title}
          </h3>

          {/* Concentration */}
          <p className="text-sm text-gray-500 mb-2">{product.concentration}</p>

          {/* Notes */}
          <div className="mb-3">
            <NotesBadge notes={product.notes} compact />
          </div>

          {/* Size selector */}
          <div className="mb-3">
            <select
              value={selectedSize.sizeMl}
              onChange={(e) => {
                // e.preventDefault();  not really nedded
                e.stopPropagation();
                const selected = product.sizes.find(
                  (s) => s.sizeMl === Number(e.target.value)
                );
                if (selected) setSelectedSize(selected);
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {product.sizes.map((size) => (
                <option key={size.sku} value={size.sizeMl}>
                  {size.sizeMl}ml
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ${selectedSize.price}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({product.rating})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default React.memo(ProductCard);
