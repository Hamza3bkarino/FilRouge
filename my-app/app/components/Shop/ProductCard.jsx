import { addToCartProduct } from '@/app/lib/Redux/cartProductSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

export default function ProductCard({items}) {
     const dispatch = useDispatch();
  
  

  // ADD TO CART HANDLER
  const handleAddToCart = (product) => {
    dispatch(addToCartProduct(product));
  };
  return (
    <div className="min-h-screen bg-[#050b07] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((product) => (
          <div key={product.id} className="group flex flex-col bg-[#102216] rounded-2xl overflow-hidden border border-white/5 hover:border-[#13ec5b]/30 transition-all hover:shadow-[0_0_20px_rgba(19,236,91,0.1)] hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative aspect-4/3 overflow-hidden bg-gray-800">
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`
                        text-[10px] font-bold px-2 py-1 rounded uppercase backdrop-blur-sm
                        ${
                        product.badge.toLowerCase() === 'hot'
                            ? 'bg-orange-500 text-white'
                            : product.badge === 'new'
                            ? 'bg-green-500 text-white'
                            : product.badge === 'sale'
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        }
                    `}
                    >
                    {product.badge}
                  </span>

                </div>
              )}
              <div className="absolute top-3 right-3 z-10">
                <button className="bg-black/40 hover:bg-white hover:text-black text-white p-1.5 rounded-full backdrop-blur-md transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div 
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col flex-1 gap-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {product.category}
                  </p>
                  <div className={`flex items-center gap-1 text-[10px] font-bold flex-row ${
                    product.stock > 20 ? 'text-green-400' : 'text-orange-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      product.stock > 20 ? 'bg-green-400 animate-pulse' : 'bg-orange-600'
                    }`}> </span>
                    {product.stock}{' '} InStock
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-[#13ec5b] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-[#13ec5b]">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-gray-500 line-through decoration-white/20">
                      {product.oldPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* AI description */}
              <div className="bg-white/5 rounded-lg p-3 border-l-2 border-[#13ec5b]/50">
                <div className="flex items-center gap-1 mb-1">
                  <svg className="w-4 h-4 text-[#13ec5b]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-[10px] font-bold text-[#13ec5b] uppercase">Description By AI</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-[#13ec5b]/50 transition-colors">
                  <img 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100"
                    src={product.image}
                  />
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="mt-auto cursor-pointer w-full py-3 bg-white text-[#102216] font-black uppercase text-sm rounded-lg hover:bg-[#13ec5b] transition-colors flex items-center justify-center gap-2"
                 onClick={() => handleAddToCart(product)}
              >
                Add to Cart 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}