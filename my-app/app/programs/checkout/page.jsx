'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../lib/Redux/cartProgramSlice';
import { FiTrash2 } from 'react-icons/fi';


const ProgramCheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartProgram.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  // Form state
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!form.fullName || !form.email || !form.address) {
      alert('Please fill all fields!');
      return;
    }
    alert('Order placed successfully!');
    dispatch(clearCart());
    setForm({ fullName: '', email: '', address: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 bg-black/60 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-green-500">
          <h2 className="text-3xl font-bold mb-6 text-green-400">Your Cart</h2>

          {cartItems.length === 0 && (
            <p className="text-gray-300 text-center">Your cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-md hover:shadow-lg transition"
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
                <p className="font-semibold text-white">{item.name}</p>
                {item.price && (
                  <p className="text-sm font-bold text-green-400">
                    ${item.price * item.quantity}
                  </p>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="px-2 py-1 bg-green-500/30 hover:bg-green-500/50 text-white rounded cursor-pointer font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 font-semibold text-white">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="px-2 py-1 bg-green-500/30 hover:bg-green-500/50 text-white rounded cursor-pointer font-bold transition"
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

          {cartItems.length > 0 && (
            <div className="mt-6 text-right">
              <p className="text-xl font-bold text-green-400">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="w-full md:w-1/2 bg-black/60 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-green-500">
          <h2 className="text-3xl font-bold mb-6 text-green-400">Checkout</h2>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black/40 text-white placeholder-gray-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black/40 text-white placeholder-gray-300"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-black/40 text-white placeholder-gray-300"
            />
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-green-500 text-black font-bold rounded-xl hover:bg-green-600 transition cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCheckoutPage;
