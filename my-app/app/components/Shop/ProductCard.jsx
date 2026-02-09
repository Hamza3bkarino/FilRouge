'use client';

import { addToCartProduct } from '@/app/lib/Redux/cartProductSlice';
import { toggleWishlist } from '@/app/lib/Redux/wishListSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEye } from "react-icons/fi";
import { useRouter } from "next/navigation";


export default function ProductCard({ data = []}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const wishlistItems = useSelector((state) => state.wishList.items);

  const isInWishlist = (id) =>
    wishlistItems.some((item) => item.id === id);

  const handleAddToCart = (product) => {
    dispatch(addToCartProduct(product));
  };

  const handleToggleWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  const handleViewProduct = (id) => {
  router.push(`/shop/${id}`);
};


  return (
    <div className="min-h-screen bg-[#050b07] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((product) => {
          const liked = isInWishlist(product.id);

          return (
            <div
              key={product.id}
              className="group flex flex-col bg-[#102216] rounded-2xl overflow-hidden border border-white/5 hover:border-[#13ec5b]/30 transition-all"
            >
              {/* IMAGE */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-800">
                
                {/*  WISHLIST BUTTON */}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className={`absolute cursor-pointer top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition
                    ${liked
                      ? 'bg-white text-red-600'
                      : 'bg-black/40 text-white hover:bg-white hover:text-black'
                    }
                  `}
                >
                  <svg
                    className="w-4 h-4"
                    fill={liked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                
                {/* VIEW BUTTON */}
                <button
                  onClick={() => handleViewProduct(product.id)}
                  className="absolute cursor-pointer top-3 left-3 z-10 p-2 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-white hover:text-black transition"
                >
                  <FiEye className="w-4 h-4" />
                </button>


                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>

              {/* DETAILS */}
              <div className="p-5 flex flex-col flex-1 gap-4">
                <h3 className="text-xl font-bold text-white">
                  {product.name}
                </h3>

                <span className="text-lg font-bold text-[#13ec5b]">
                  ${product.price}
                </span>
                <div className="bg-white/5 rounded-lg p-3 border-l-2 border-[#13ec5b]/60">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-bold text-[#13ec5b] uppercase tracking-wide">
                      AI Analysis
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>


                {/* ADD TO CART */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto w-full py-3 bg-white text-[#102216] font-black uppercase rounded-lg hover:bg-[#13ec5b] transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
