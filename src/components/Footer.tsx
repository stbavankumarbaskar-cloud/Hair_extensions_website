import React from 'react';

export default function Footer() {
  return (
      <footer className="bg-zinc-900 text-white pt-20 pb-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
           {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-zinc-800 pb-16 mb-16 text-center">
             <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <svg className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Worldwide Delivery</h4>
                <p className="text-sm text-zinc-400">Fast & trackable shipping to your doorstep</p>
             </div>
             <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <svg className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Free Gift</h4>
                <p className="text-sm text-zinc-400">With every order above $100</p>
             </div>
             <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <svg className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">Secure Checkout</h4>
                <p className="text-sm text-zinc-400">100% secure payment</p>
             </div>
             <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-amber-600 transition-colors duration-300">
                  <svg className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                </div>
                <h4 className="font-semibold text-lg mb-2">30 Days Return</h4>
                <p className="text-sm text-zinc-400">If you are not satisfied, return it back</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center mb-6">
                <div className="flex flex-col items-center justify-center border-2 border-amber-600 rounded-full w-10 h-10 mr-2">
                   <span className="text-amber-600 font-serif font-bold text-sm">LH</span>
                </div>
                <span className="font-serif font-semibold text-xl tracking-wider text-white">LOVE HAIR</span>
              </div>
              <p className="text-zinc-400 text-sm mb-6 max-w-sm">
                Premium 100% human hair extensions, wigs, and bundles. Guaranteed luxury & quality.
              </p>
               <div className="flex space-x-4">
                 {/* Social Icons Placeholders */}
                 <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-600 transition"><span className="sr-only">Facebook</span>f</a>
                 <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-600 transition"><span className="sr-only">Instagram</span>ig</a>
                 <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-600 transition"><span className="sr-only">Pinterest</span>P</a>
               </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Shop All</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Human Hair Wigs</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Hair Bundles</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">HD Lace Wigs</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Sale</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">About Us</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Blog</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Rewards Program</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Affiliate</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-amber-500 transition">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Newsletter</h4>
              <p className="text-zinc-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <form className="flex">
                <input suppressHydrationWarning type="email" placeholder="Your email" className="bg-zinc-800 text-white px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-l" />
                <button suppressHydrationWarning type="submit" className="bg-amber-600 hover:bg-amber-700 px-4 py-2 text-white font-bold rounded-r transition">Join</button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-sm">
             <p>&copy; {new Date().getFullYear()} LOVE HAIR Extension Store. All Rights Reserved.</p>
             <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <span className="bg-white text-blue-900 border font-bold px-2 py-1 rounded text-xs">VISA</span>
                <span className="bg-white text-red-600 border font-bold px-2 py-1 rounded text-xs">MasterCard</span>
                <span className="bg-white text-blue-500 border font-bold px-2 py-1 rounded text-xs">PayPal</span>
                <span className="bg-white text-black border font-bold px-2 py-1 rounded text-xs">Apple Pay</span>
             </div>
          </div>
        </div>
      </footer>
  );
}
