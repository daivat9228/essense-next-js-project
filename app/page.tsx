'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchProducts } from '@/store/slices/productsSlice';
import ProductGrid from '@/components/ProductGrid';


export default function HomePage() {

  //   const dispatch = useAppDispatch();
  // const { items: products, loading } = useAppSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  // const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  // const displayProducts = loading || featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);
  
  // const newArrivals = products.slice(0, 8);

  
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);

  
 // Fetch only if we don't already have products and not currently loading
  useEffect(() => {
    if (!products.length && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loading]);


  // Memoize derived lists so they don't recompute each render
  const featuredProducts = useMemo(
    () => products.filter((product) => product.featured).slice(0, 4),
    [products]
  );


  const displayProducts = useMemo(() => {
    // While loading, keep showing skeletons from ProductGrid (ProductGrid should act on `loading`)
    if (loading) return products.slice(0, 4);
    return featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);
  }, [loading, featuredProducts, products]);


  const newArrivals = useMemo(() => products.slice(0, 8), [products]);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1759794108389-132d8bb4e87a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury perfume bottles"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
              Discover Your
              <span className="block text-gold-400">Signature Scent</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100">
              Explore our curated collection of premium fragrances from renowned houses and emerging artisans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="bg-white text-primary-900 hover:bg-primary-900 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center"
              >
                Shop All Fragrances
              </Link>
              <Link
                href="/catalog?category=Niche"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-900 font-semibold py-3 px-8 rounded-lg transition-colors text-center"
              >
                Explore Niche Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect fragrance for every occasion and personality
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Men', href: '/catalog?category=Men', image: 'https://images.unsplash.com/photo-1708979165880-dd0ff61fa748?q=80&w=1464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { name: 'Women', href: '/catalog?category=Women', image: 'https://images.unsplash.com/photo-1746746411904-5b59015667d4?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { name: 'Niche', href: '/catalog?category=Niche', image: 'https://images.unsplash.com/photo-1623607314438-ee4df4336c6b?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
              { name: 'Designer', href: '/catalog?category=Designer', image: 'https://images.unsplash.com/photo-1759794108525-94ff060da692?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------   Featured Products  --------------------------------- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Fragrances
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked selections from our perfume experts
            </p>
          </div>
          
          <ProductGrid products={displayProducts} loading={loading} />
          
          {!loading && displayProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/catalog"
                className="btn-primary inline-block"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* -------------------------   Fragrance Families  --------------------------------- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Explore by Fragrance Family
            </h2>
            <p className="text-lg text-gray-600">
              Discover scents that match your preferences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Floral', href: '/catalog?family=Floral', icon: '🌸' },
              { name: 'Woody', href: '/catalog?family=Woody', icon: '🌲' },
              { name: 'Citrus', href: '/catalog?family=Citrus', icon: '🍊' },
              { name: 'Oriental', href: '/catalog?family=Oriental', icon: '🌟' },
              { name: 'Fresh', href: '/catalog?family=Fresh', icon: '💧' },
              { name: 'Gourmand', href: '/catalog?family=Gourmand', icon: '🍯' },
            ].map((family) => (
              <Link
                key={family.name}
                href={family.href}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {family.icon}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {family.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------   New Arrivals ------------------------------ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              New Arrivals
            </h2>
            <p className="text-lg text-gray-600">
              The latest additions to our fragrance collection
            </p>
          </div>
            
          <ProductGrid products={newArrivals} loading={loading} />
        </div>
      </section>

      {/* -------------------------   Newsletter  ------------------------ */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
            Stay in the Scent
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be the first to know about new arrivals, exclusive offers, and fragrance tips
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button className="bg-gold-500 hover:bg-gold-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}