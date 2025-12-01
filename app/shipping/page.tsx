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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Shipping Info' }]} />
          </div>

          <div className="text-center py-16">
            <ShieldCheckIcon className="mx-auto h-16 w-16 text-gray-300 mb-6" />
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Sign In Required
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in to view detailed shipping information and track your orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account/sign-in"
                className="btn-primary inline-block"
              >
                Sign In
              </Link>
              <Link
                href="/catalog"
                className="btn-outline inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Shipping Info' }]} />
        </div>

        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-8">
          Shipping Information
        </h1>

        <div className="space-y-8">
          {/* Shipping Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <TruckIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Standard Shipping</h3>
                <p className="text-gray-600 text-sm mb-2">5-7 business days</p>
                <p className="font-semibold text-green-600">FREE on orders $75+</p>
                <p className="text-gray-500 text-sm">$5.99 under $75</p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <ClockIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Express Shipping</h3>
                <p className="text-gray-600 text-sm mb-2">2-3 business days</p>
                <p className="font-semibold text-gray-900">$12.99</p>
              </div>
              
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <ShieldCheckIcon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Overnight</h3>
                <p className="text-gray-600 text-sm mb-2">Next business day</p>
                <p className="font-semibold text-gray-900">$24.99</p>
              </div>
            </div>
          </div>

          {/* Shipping Policies */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Policies</h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Processing Time</h3>
                <p>Orders are processed within 1-2 business days. Orders placed after 2 PM EST will be processed the next business day.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Shipping Areas</h3>
                <p>We currently ship to all 50 US states. International shipping is not available at this time.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Package Protection</h3>
                <p>All orders are carefully packaged to prevent damage. Fragile items include extra protective packaging.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Tracking</h3>
                <p>You'll receive a tracking number via email once your order ships. Track your package through our website or the carrier's site.</p>
              </div>
            </div>
          </div>

          {/* Your Orders */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Recent Orders</h2>
              <Link
                href="/account/orders"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View All Orders →
              </Link>
            </div>
            
            <p className="text-gray-600">
              Welcome back, {user.name}! You can track all your orders from your account page.
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              Have questions about shipping? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:support@essence.com" className="text-primary-600 hover:text-primary-700 font-medium">
                Email: support@essence.com
              </a>
              <a href="tel:1-800-ESSENCE" className="text-primary-600 hover:text-primary-700 font-medium">
                Phone: 1-800-ESSENCE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}