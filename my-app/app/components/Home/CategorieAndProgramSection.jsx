import { useRouter } from 'next/navigation';
import React from 'react';

export const ShopByCategoriesAndFeaturedProgram = () => {
  const categories = [
    {
      id: 1,
      name: "Equipment",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop",
      alt: "Dumbbells and weight plates in a dark gym"
    },
    {
      id: 2,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop",
      alt: "Sports accessories and gear"
    },
    {
      id: 3,
      name: "Nutrition",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      alt: "Nutrition supplements and protein powder"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shop by Categories */}
      <div className="lg:col-span-1 flex flex-col h-full">
        <h2 className="pb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 grow">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Program */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Program
          </h2>
        </div>
        <FeaturedProgram />
      </div>
    </div>
  );
};

const CategoryCard = ({ category }) => {
  const router = useRouter();

  return (
    <div className="group relative flex h-24 lg:h-auto lg:flex-1 overflow-hidden rounded-xl bg-gray-800 cursor-pointer"
      onClick={()=>router.push(`/shop?category=${category.name}`)}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"
        style={{ backgroundImage: `url(${category.image})` }}
      />
      <div className="relative z-10 flex w-full items-center justify-between px-6">
        <span className="text-xl font-bold text-white">{category.name}</span>
        <svg 
          className="w-8 h-8 text-green-400 transition-transform group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  );
};

const FeaturedProgram = () => {

  const router = useRouter();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gray-800 border border-white/5 h-100 lg:h-125 group shadow-2xl">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop)`,
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col justify-center h-full p-10 lg:p-14 max-w-lg">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded bg-green-400 px-3 py-1 text-xs font-black uppercase text-black">
            Pro Plan
          </span>
          <span className="text-sm font-medium text-gray-300 bg-black/40 px-3 py-1 rounded backdrop-blur-sm">
            4 Weeks Duration
          </span>
        </div>
        
        <h3 className="text-4xl lg:text-5xl font-black italic uppercase text-white leading-none mb-4">
          30-Day Shred<br />
          <span className="text-green-400">Challenge</span>
        </h3>
        
        <p className="text-base text-gray-300 mb-8 max-w-sm leading-relaxed">
          High intensity interval training designed by our proprietary AI engine to shock your muscles into growth.
        </p>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
              Program Intensity
            </span>
            <div className="flex gap-1">
              <div className="h-2 w-8 rounded-full bg-green-400"></div>
              <div className="h-2 w-8 rounded-full bg-green-400"></div>
              <div className="h-2 w-8 rounded-full bg-green-400"></div>
              <div className="h-2 w-8 rounded-full bg-white/20"></div>
              <div className="h-2 w-8 rounded-full bg-white/20"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <button className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold uppercase text-black hover:bg-gray-200 transition-colors shadow-lg cursor-pointer"
              onClick={()=>router.push('programs')}
            >
              Start Now
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-sm font-bold uppercase text-white cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-md"
              onClick={()=>router.push('programs')}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen bg-[#050b07] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <ShopByCategoriesAndFeaturedProgram />
      </div>
    </div>
  );
}