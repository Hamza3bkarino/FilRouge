'use client';

import React from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// PROGRAM CART
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from '../lib/Redux/cartProgramSlice';

// PRODUCT CART
import {
  removeFromCartProduct,
  clearCartProducts,
  increaseProductQuantity,
  decreaseProductQuantity,
} from '../lib/Redux/cartProductSlice';

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartPrograms = useSelector((state) => state.cartProgram.items);
  const cartProducts = useSelector((state) => state.cartProduct.items);

  // 🔥 Merge programs + products
  const allCartItems = [
    ...cartPrograms.map((item) => ({ ...item, type: 'program' })),
    ...cartProducts.map((item) => ({ ...item, type: 'product' })),
  ];

  // 💰 Total price
  const totalPrice = allCartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-80 bg-white/95 backdrop-blur-lg z-50 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-300">
          <h2 className="text-xl font-bold text-gray-800">
            Your Cart ({allCartItems.length})
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
          >
            <FiX size={26} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {allCartItems.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Your cart is empty
            </p>
          )}

          {allCartItems.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-3 bg-white rounded-xl shadow p-3"
            >
              {/* Image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.quantity}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      item.type === 'program'
                        ? dispatch(decreaseQuantity(item.id))
                        : dispatch(decreaseProductQuantity(item.id))
                    }
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      item.type === 'program'
                        ? dispatch(increaseQuantity(item.id))
                        : dispatch(increaseProductQuantity(item.id))
                    }
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() =>
                  item.type === 'program'
                    ? dispatch(removeFromCart(item.id))
                    : dispatch(removeFromCartProduct(item.id))
                }
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        {allCartItems.length > 0 && (
          <div className="p-5 border-t border-gray-300 space-y-3">
            <p className="text-lg font-bold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <button
              onClick={() => {
                dispatch(clearCart());
                dispatch(clearCartProducts());
                onClose();
              }}
              className="w-full py-3 bg-gray-200 font-bold rounded-xl hover:bg-gray-300 cursor-pointer"
            >
              Clear Cart
            </button>

            <button
              onClick={() => {
                router.push('/checkout');
                onClose();
              }}
              className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
