'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/store/slices/userSlice';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  ArrowRightOnRectangleIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

export default function OrdersPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: any) => state.user.user);
  const orders = useAppSelector((state: any) => state.user.orders);

  // ✅ Redirect only on client
  useEffect(() => {
    if (!user) {
      router.push('/account/sign-in');
    }
  }, [user, router]);

  // While deciding / redirecting, don't render anything
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'My Account' }]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span>Order History</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
                Order History
              </h1>
              <p className="text-lg text-gray-600">
                Track and manage your fragrance orders
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-300 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No orders yet
                </h3>
                <p className="text-gray-600 mb-8">
                  Start exploring our collection of premium fragrances
                </p>
                <Link
                  href="/catalog"
                  className="btn-primary inline-block"
                >
                  Shop Fragrances
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order: any) => (
                  <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Order Header */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${order.total.toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900">{item.title}</h4>
                              <p className="text-sm text-gray-600">
                                {item.brand} • {item.concentration} • {item.size}ml
                              </p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Delivered to: {order.shippingAddress.name}
                        </div>
                        <div className="flex space-x-3">
                          <Link
                            href={`/checkout/confirmation?orderId=${order.id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                          >
                            View Details
                          </Link>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors">
                            Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
