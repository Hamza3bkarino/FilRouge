'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, clearWishlist } from '@/app/lib/Redux/wishListSlice';
import { addToCartProduct } from '@/app/lib/Redux/cartProductSlice';
import { FiHeart, FiTrash2, FiShoppingCart } from 'react-icons/fi';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishList.items);
  

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#050b07] flex flex-col items-center justify-center text-gray-400">
        <FiHeart size={48} className="mb-4 opacity-50" />
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is empty</h2>
        <p>Save products you like</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b07] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <FiHeart className="text-red-500" />
            Wishlist ({wishlist.length})
          </h1>

          <button
            onClick={() => dispatch(clearWishlist())}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition cursor-pointer"
          >
            <FiTrash2 />
            Clear
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-[#102216] rounded-2xl overflow-hidden border border-white/5 hover:border-[#13ec5b]/30 transition hover:shadow-[0_0_20px_rgba(19,236,91,0.15)]"
            >
              {/* Image */}
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

                {/* Remove from wishlist */}
                <button
                  onClick={() => dispatch(toggleWishlist(product))}
                  className="absolute top-3 right-3 bg-black/40 p-2 rounded-full text-red-500 hover:bg-white hover:text-black transition cursor-pointer"
                >
                  <FiHeart />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-4">
                <h3 className="text-xl font-bold text-white">
                  {product.name}
                </h3>

                <p className="text-[#13ec5b] font-black text-lg">
                  ${product.price}
                </p>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <button
                    onClick={() => dispatch(addToCartProduct(product))}
                    className="flex-1 py-2 bg-white text-[#102216] font-black rounded-lg hover:bg-[#13ec5b] transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => dispatch(toggleWishlist(product))}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition cursor-pointer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
