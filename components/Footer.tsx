import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* --------------------------  Brand  ----------------------------- */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-primary-400 mb-4">Essence</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover the world's finest fragrances. From niche artisanal scents to designer classics, 
              we curate exceptional perfumes for every personality and occasion.
            </p>
            
            {/* --------------------------  Newsletter  ----------------------------- */}
            <div>
              <h4 className="font-semibold mb-3">Stay in the scent</h4>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-white"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* --------------------------  Quick Links  ----------------------------- */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/catalog" className="hover:text-primary-400 transition-colors">All Fragrances</Link></li>
              <li><Link href="/catalog?category=Men" className="hover:text-primary-400 transition-colors">Men's Fragrances</Link></li>
              <li><Link href="/catalog?category=Women" className="hover:text-primary-400 transition-colors">Women's Fragrances</Link></li>
            </ul>
          </div>

          {/* --------------------------  Customer Care  ----------------------------- */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/account/orders" className="hover:text-primary-400 transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-primary-400 transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Returns</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* --------------------------  Fragrance Care Tips  ----------------------------- */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="font-semibold mb-4">Fragrance Care Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <h5 className="font-medium text-white mb-2">Storage</h5>
              <p>Keep fragrances in a cool, dry place away from direct sunlight to preserve their quality.</p>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2">Application</h5>
              <p>Apply to pulse points like wrists and neck for best projection and longevity.</p>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2">Layering</h5>
              <p>Start with lighter scents and build up. Allow each layer to dry before applying the next.</p>
            </div>
          </div>
        </div>

        {/* --------------------------  Bottom  ----------------------------- */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Essence. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}