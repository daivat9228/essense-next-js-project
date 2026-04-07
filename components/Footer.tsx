import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-primary-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand + Newsletter */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif font-bold text-primary-400 mb-3 tracking-wide">Essence</h3>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed text-sm">
              Discover the world's finest fragrances. From niche artisanal scents to designer classics, 
              we curate exceptional perfumes for every personality and occasion.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mb-8">
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'Pinterest', path: 'M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-primary-600 border border-white/10 hover:border-primary-500 transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-widest">Stay in the Scent</h4>
              <div className="flex max-w-sm rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/5 focus:outline-none focus:bg-white/10 text-white placeholder-gray-500 text-sm transition-colors"
                />
                <button className="bg-primary-600 hover:bg-primary-500 px-5 py-3 font-medium text-sm transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Fragrances', href: '/catalog' },
                { label: "Men's Collection", href: '/catalog?category=Men' },
                { label: "Women's Collection", href: '/catalog?category=Women' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 text-sm uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-3">
              {[
                { label: 'Track Your Order', href: '/account/orders' },
                { label: 'Shipping Info', href: '/shipping' },
                { label: 'Returns & Exchanges', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'FAQ', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fragrance Care Tips */}
        <div className="py-10 border-b border-white/10">
          <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-widest text-center">Fragrance Care Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌡️', title: 'Storage', tip: 'Keep fragrances in a cool, dry place away from direct sunlight to preserve their quality.' },
              { icon: '✨', title: 'Application', tip: 'Apply to pulse points like wrists and neck for best projection and longevity.' },
              { icon: '🎨', title: 'Layering', tip: 'Start with lighter scents and build up. Allow each layer to dry before applying the next.' },
            ].map(({ icon, title, tip }) => (
              <div key={title} className="bg-white/5 hover:bg-white/8 border border-white/10 rounded-xl p-5 transition-colors">
                <div className="text-2xl mb-3">{icon}</div>
                <h5 className="font-semibold text-white mb-2 text-sm">{title}</h5>
                <p className="text-gray-400 text-xs leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} <span className="text-primary-400 font-medium">Essence</span>. All rights reserved. Crafted with ♡ for fragrance lovers.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((label) => (
              <Link key={label} href="#" className="text-gray-500 hover:text-primary-400 text-xs transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
