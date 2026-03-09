'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/store';
import Breadcrumbs from '@/components/Breadcrumbs';
import { TruckIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function ShippingInfoPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'Shipping Info' }]} />
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white p-12 text-center max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-100/50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <ShieldCheckIcon className="h-12 w-12 text-primary-500" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
                Sign In Required
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
                Please sign in to view your personalized shipping information, track your recent orders, and manage your addresses.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/account/sign-in"
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign In to Continue
                </Link>
                <Link
                  href="/catalog"
                  className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-medium transition-all duration-300 shadow-sm hover:shadow"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 pb-20">
      {/* Decorative header background */}
      <div className="w-full bg-white border-b border-gray-200/60 pb-10 pt-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Breadcrumbs items={[{ label: 'Shipping Info' }]} />
          </div>
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-primary-100 p-3 rounded-full shadow-sm">
              <TruckIcon className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Shipping Information
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl ml-[72px]">
            Everything you need to know about how we deliver our premium fragrances to your doorstep.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
        <div className="space-y-10">
          {/* Shipping Options */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-2">
              <span className="bg-primary-600 w-1.5 h-6 rounded-full inline-block"></span>
              Shipping Options
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-6 border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50/50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                <TruckIcon className="h-10 w-10 text-primary-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Standard Shipping</h3>
                <p className="text-gray-500 text-sm mb-4">5-7 business days</p>
                <div className="mt-auto space-y-2">
                  <p className="font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 inline-block px-3 py-1 rounded-full text-sm">FREE on orders $75+</p>
                  <p className="text-gray-500 text-sm pl-1">$5.99 under $75</p>
                </div>
              </div>
              
              <div className="group bg-white p-6 border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50/50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                <ClockIcon className="h-10 w-10 text-primary-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Express Shipping</h3>
                <p className="text-gray-500 text-sm mb-4">2-3 business days</p>
                <div className="mt-auto">
                  <p className="font-bold text-xl text-gray-900">$12.99</p>
                </div>
              </div>
              
              <div className="group bg-white p-6 border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50/50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                <ShieldCheckIcon className="h-10 w-10 text-primary-500 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Overnight</h3>
                <p className="text-gray-500 text-sm mb-4">Next business day</p>
                <div className="mt-auto">
                  <p className="font-bold text-xl text-gray-900">$24.99</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Policies */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="bg-primary-600 w-1.5 h-6 rounded-full inline-block"></span>
                Shipping Policies
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-700">
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-400 before:rounded-full">
                  <h3 className="font-bold text-gray-900 mb-2">Processing Time</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">Orders are processed within 1-2 business days. Orders placed after 2 PM EST will be processed the next business day.</p>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-400 before:rounded-full">
                  <h3 className="font-bold text-gray-900 mb-2">Shipping Areas</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">We currently ship to all 50 US states. International shipping is not available at this time.</p>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-400 before:rounded-full">
                  <h3 className="font-bold text-gray-900 mb-2">Package Protection</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">All orders are carefully packaged to prevent damage. Fragile items include extra protective packaging.</p>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary-400 before:rounded-full">
                  <h3 className="font-bold text-gray-900 mb-2">Tracking</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">You'll receive a tracking number via email once your order ships. Track your package through our website or the carrier's site.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:col-span-1">
              {/* Your Orders */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-md p-8 text-white relative overflow-hidden select-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h2 className="text-xl font-bold mb-3">Your Recent Orders</h2>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    Welcome back, <span className="font-semibold text-white">{user.name}</span>! Track all your orders from your account dashboard.
                  </p>
                  <Link
                    href="/account/orders"
                    className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-medium transition-all hover:bg-gray-100 shadow hover:shadow-lg"
                  >
                    View Orders
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-primary-50/50 backdrop-blur-sm border border-primary-100 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Need Help?</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Questions about shipping? Our team is here to help.
                </p>
                <div className="space-y-3">
                  <a href="mailto:support@essence.com" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors group">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="font-medium text-sm">support@essence.com</span>
                  </a>
                  <a href="tel:1-800-ESSENCE" className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors group">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm group-hover:shadow transition-shadow">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span className="font-medium text-sm">1-800-ESSENCE</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
