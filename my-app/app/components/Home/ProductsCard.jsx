import { fetchProducts } from '@/app/lib/Redux/productSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEye, FiHeart, FiPlus } from "react-icons/fi";

export const TrendingGear = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  console.log(products);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className=" pb-12 max-w-7xl mx-auto">
      <h2 className="pb-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Trending Gear
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};



const ProductCard = ({ product }) => {

  const discountPercent = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : null;

  return (
    <div className="w-75 group flex flex-col gap-3 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 relative">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-800 shadow-md">
        {/* discountPercent badge */}
        {discountPercent  && (
          <div className="absolute top-3 left-3 z-20 rounded bg-red-500 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
            -{discountPercent}% Sale
          </div>
        )}

        {/* Heart icon (top-right) */}
        <button className="absolute top-3 right-3 z-20 flex size-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-green-400 hover:text-black transition-colors opacity-0 group-hover:opacity-100 duration-300">
          <FiHeart className="w-5 h-5" />
        </button>

        {/* Product image */}
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${product.image})` }}
        />

        {/* Overlay for hover (darken image) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-colors duration-300 z-10 rounded-xl" />

        {/* Centered View icon */}
        <button className=" cursor-pointer absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-colors">
            <FiEye className="w-6 h-6  text-green-400" />
          </div>
        </button>
      </div>

      {/* Product details */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-400">
            {Number(product.price).toFixed(2)}
          </span>

          {/* Add button */}
          <button className="cursor-pointer text-slate-500 dark:text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1 text-xs font-bold uppercase">
            Add <FiPlus className="w-5 h-5 " />
          </button>
        </div>
      </div>
    </div>
  );
};



// Main App Component with dark background
export default function App() {
  return (
    <div className="min-h-screen bg-[#050b07] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <TrendingGear />
      </div>
    </div>
  );
}
