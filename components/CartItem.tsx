'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types';
import { useAppDispatch } from '@/store';
import { updateQuantity, removeItem } from '@/store/slices/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    dispatch(updateQuantity({
      productId: item.productId,
      size: item.size,
      quantity: newQuantity
    }));
  };

  const handleRemove = () => {
    dispatch(removeItem({
      productId: item.productId,
      size: item.size
    }));
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex items-center space-x-4 py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              <Link 
                href={`/catalog/${item.productId}`}
                className="hover:text-primary-600 transition-colors"
              >
                {item.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-600 mt-1">{item.brand}</p>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
              <span>{item.concentration}</span>
              <span>•</span>
              <span>{item.size}ml</span>
            </div>
          </div>
          
          {/* Remove button */}
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Quantity and Price */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium border-x border-gray-300">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              ${subtotal.toFixed(2)}
            </p>
            {item.quantity > 1 && (
              <p className="text-xs text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}