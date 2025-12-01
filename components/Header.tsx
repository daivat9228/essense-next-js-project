'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href: string;
}

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user);
  const cartItemCount: number = cartItems.reduce((total: number, item) => total + item.quantity, 0);

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Men', href: '/catalog?category=Men' },
    { name: 'Women', href: '/catalog?category=Women' },
    { name: 'Unisex', href: '/catalog?category=Unisex' },
  ];

  return (
    <header className="bg-white/90 shadow-sm border-b border-gray-200 sticky top-0 z-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-bold text-primary-600">
              Essence
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search fragrances..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <button className="md:hidden p-2 text-gray-700 hover:text-primary-600">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* User account */}
            <Link
              href="/wishlist"
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <HeartIcon className="h-6 w-6" />
            </Link>

            <Link
              href={user ? "/account/orders" : "/account/sign-in"}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <UserIcon className="h-6 w-6" />
            </Link>

            {/* Shopping cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={(): void => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={(): void => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Mobile search */}
            <div className="mt-4 px-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search fragrances..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}