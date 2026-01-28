'use client';

import React from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from '../lib/Redux/cartProgramSlice';
import { useRouter } from 'next/navigation';

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartProgram.items);
  const router = useRouter();
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  return (
    <>
      {/* Full-page Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-80 bg-white/95 backdrop-blur-lg z-50 shadow-2xl transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            <FiX size={26} className="text-black" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty
            </p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white/70 backdrop-blur-md rounded-xl shadow-md p-3 hover:shadow-lg transition"
            >
              {/* Product Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}

              {/* Product Details */}
              <div className="flex-1 flex flex-col gap-2 ml-3">
                <p className="font-semibold text-gray-800">{item.name}</p>
                {item.price && (
                  <p className="text-sm font-bold text-gray-900">
                    ${item.price * item.quantity}
                  </p>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 transition cursor-pointer ml-2"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-300">
            <p className="text-lg font-bold text-gray-800 mb-3">
              Total: ${totalPrice}
            </p>
            <div className='flex flex-col justify-between gap-2'>
                <button
                    onClick={() => {
                        dispatch(clearCart());
                        onClose();
                    }}
                    className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 transition cursor-pointer"
                    >
                    Clear Cart
                    </button>
                    <button
                    onClick={() => {
                        router.push('/programs/checkout');
                        onClose();
                    }}
                    className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 transition cursor-pointer"
                    >
                    Checkout
                </button>
            </div>
            
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
