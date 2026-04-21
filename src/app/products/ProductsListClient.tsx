"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, ChevronRight, LayoutGrid, List, ShoppingCart } from 'lucide-react';

const FILTER_CATEGORIES = [
  {
    name: 'Shop by Type',
    options: [
      'Clip-In Hair Extensions', 'Tape-In Hair Extensions', 'Sew-In / Weft Extensions',
      'Fusion / Keratin Bond Extensions', 'Micro Link / I-Tip Extensions',
      'Halo Hair Extensions', 'Ponytail Extensions', 'Bangs / Fringe Extensions',
      'Wigs & Hairpieces'
    ]
  },
  {
    name: 'Shop by Hair Type',
    options: [
      'Human Hair Extensions', 'Remy Hair Extensions', 'Virgin Hair Extensions',
      'Synthetic Hair Extensions', 'Blended Hair Extensions'
    ]
  },
  {
    name: 'Shop by Texture',
    options: [
      'Straight', 'Body Wave', 'Deep Wave', 'Curly', 'Kinky Curly', 'Afro / Coily'
    ]
  },
  {
    name: 'Shop by Length',
    options: [
      'Short (8–12 inches)', 'Medium (14–18 inches)', 'Long (20–24 inches)', 'Extra Long (26+ inches)'
    ]
  },
  {
    name: 'Shop by Color',
    options: [
      'Natural Black', 'Brown Shades', 'Blonde Shades', 'Ombre', 'Balayage',
      'Highlighted', 'Fashion Colors', 'Gray / Silver'
    ]
  },
  {
    name: 'Shop by Volume / Weight',
    options: [
      'Light Volume', 'Medium Volume', 'Full Volume', 'Extra Thick Bundles'
    ]
  }
];

export default function ProductsListClient({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      // Try to find matching filter option
      const flatOptions = FILTER_CATEGORIES.flatMap(c => c.options);
      const matched = flatOptions.find(opt => opt.toLowerCase().includes(category.toLowerCase()));
      if (matched) {
        setSelectedFilters([matched]);
      }
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) return initialProducts;
    
    return initialProducts.filter(product => {
      // Logic for filtering based on selected filters
      // Since our DB doesn't have all these tags yet, we filter by category if it matches
      const lowercaseFilters = selectedFilters.map(f => f.toLowerCase());
      
      // Simple match logic for demonstration: check if category or name contains the filter word
      return lowercaseFilters.some(filter => 
        product.category?.toLowerCase().includes(filter) || 
        product.name?.toLowerCase().includes(filter)
      );
    });
  }, [initialProducts, selectedFilters]);

  const toggleFilter = (option: string) => {
    setSelectedFilters(prev => 
      prev.includes(option) 
        ? prev.filter(f => f !== option) 
        : [...prev, option]
    );
  };

  const clearFilters = () => setSelectedFilters([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest mb-4">
            <a href="/" className="hover:text-amber-600">Home</a>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-gray-900 font-bold">Products</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900">All Collections</h1>
          <p className="text-gray-500 mt-2">{filteredProducts.length} Products Found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-hide">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tighter">
                  <Filter className="w-4 h-4" /> Filters
                </h2>
                {selectedFilters.length > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-amber-600 font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {FILTER_CATEGORIES.map((category) => (
                <div key={category.name} className="border-b border-gray-50 pb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider flex items-center justify-between">
                    {category.name}
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </h3>
                  <div className="space-y-3">
                    {category.options.map((option) => (
                      <label key={option} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox"
                            className="peer appearance-none w-4 h-4 border border-gray-300 rounded-[2px] checked:bg-amber-600 checked:border-amber-600 transition-all"
                            checked={selectedFilters.includes(option)}
                            onChange={() => toggleFilter(option)}
                          />
                          <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5 top-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="ml-3 text-[13px] text-gray-600 group-hover:text-amber-600 transition-colors font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
               <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 text-sm font-bold border border-gray-200 px-4 py-2 hover:bg-gray-50 transition"
                  >
                    <Filter className="w-4 h-4" /> Filter
                  </button>
                  <div className="hidden sm:flex items-center space-x-2">
                    <button className="p-2 text-gray-900 border border-gray-200 rounded-sm hover:bg-gray-50 transition"><LayoutGrid className="w-4 h-4"/></button>
                    <button className="p-2 text-gray-400 border border-gray-200 rounded-sm hover:bg-gray-50 transition"><List className="w-4 h-4"/></button>
                  </div>
               </div>

               <div className="flex items-center space-x-2">
                 <span className="text-[13px] text-gray-500 font-medium">Sort by :</span>
                 <select 
                   value={sortBy}
                   onChange={(e) => setSortBy(e.target.value)}
                   className="text-[13px] font-bold text-gray-900 bg-transparent focus:outline-none cursor-pointer"
                 >
                   <option value="featured">Featured</option>
                   <option value="newest">Newest Arrival</option>
                   <option value="price-low">Price: Low to High</option>
                   <option value="price-high">Price: High to Low</option>
                   <option value="best">Best Seller</option>
                 </select>
               </div>
            </div>

            {/* Active Tags */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedFilters.map(filter => (
                  <span key={filter} className="inline-flex items-center px-3 py-1 bg-gray-100 text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
                    {filter}
                    <button onClick={() => toggleFilter(filter)} className="ml-2 hover:text-red-500"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
               <div className="py-20 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900">No products match your filters</h3>
                  <p className="text-gray-500 mt-2 mb-8">Try adjusting your selection or clearing all filters.</p>
                  <button 
                    onClick={clearFilters}
                    className="bg-gray-900 text-white px-8 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
               </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-20 flex justify-center items-center space-x-2">
                <button className="w-10 h-10 border border-amber-600 bg-amber-600 text-white font-bold rounded-sm">1</button>
                <button className="w-10 h-10 border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition rounded-sm">2</button>
                <button className="w-10 h-10 border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition rounded-sm">3</button>
                <button className="px-4 h-10 border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition rounded-sm flex items-center gap-2">Next <ChevronRight className="w-4 h-4"/></button>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)}></div>
          <div className="absolute top-0 right-0 h-full w-[85%] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-tighter">Filter By</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2"><X className="w-6 h-6"/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-10">
               {FILTER_CATEGORIES.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xs font-bold text-gray-900 mb-6 uppercase tracking-[0.2em]">{category.name}</h3>
                  <div className="space-y-4">
                    {category.options.map((option) => (
                      <label key={option} className="flex items-center group cursor-pointer">
                        <input 
                          type="checkbox"
                          className="w-5 h-5 border border-gray-300 rounded-[2px] transition-all"
                          checked={selectedFilters.includes(option)}
                          onChange={() => toggleFilter(option)}
                        />
                        <span className="ml-4 text-[14px] text-gray-600 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-4">
               <button 
                onClick={clearFilters}
                className="flex-1 py-4 text-xs font-bold uppercase tracking-widest border border-gray-200 hover:bg-gray-50 transition"
               >
                Clear
               </button>
               <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-4 text-xs font-bold uppercase tracking-widest bg-gray-900 text-white hover:bg-amber-600 transition"
               >
                Show Results
               </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CartDrawer />
    </div>
  );
}
