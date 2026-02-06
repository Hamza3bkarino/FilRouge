'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from '../lib/Redux/cartProgramSlice';

import {
  removeFromCartProduct,
  clearCartProducts,
  increaseProductQuantity,
  decreaseProductQuantity,
} from '../lib/Redux/cartProductSlice';

import { FiTrash2 } from 'react-icons/fi';

const ProgramCheckoutPage = () => {
  const dispatch = useDispatch();

  const programItems = useSelector((state) => state.cartProgram.items);
  const productItems = useSelector((state) => state.cartProduct.items);

  // 🔥 Merge carts
  const cartItems = [
    ...programItems.map((i) => ({ ...i, type: 'program' })),
    ...productItems.map((i) => ({ ...i, type: 'product' })),
  ];

  // 💰 Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!form.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = () => {
    if (!validateForm()) return;

    alert('Order placed successfully');

    dispatch(clearCart());
    dispatch(clearCartProducts());
  };

  return (
    <div className="min-h-screen bg-[#0b0f0d] text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* CART */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-[#13ec5b]">
            Your Training Cart
          </h1>

          <div className="border border-[#1e3a29] divide-y divide-[#1e3a29]">
            {cartItems.length === 0 && (
              <p className="p-6 text-gray-400">Your cart is empty</p>
            )}

            {cartItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex gap-4 p-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover border border-[#1e3a29]"
                  />
                )}

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-[#8ec5a1]">
                    ${item.price} × {item.quantity}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() =>
                        item.type === 'program'
                          ? dispatch(decreaseQuantity(item.id))
                          : dispatch(decreaseProductQuantity(item.id))
                      }
                      className="px-3 py-1 border border-[#1e3a29] text-[#13ec5b] cursor-pointer"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        item.type === 'program'
                          ? dispatch(increaseQuantity(item.id))
                          : dispatch(increaseProductQuantity(item.id))
                      }
                      className="px-3 py-1 border border-[#1e3a29] text-[#13ec5b] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() =>
                    item.type === 'program'
                      ? dispatch(removeFromCart(item.id))
                      : dispatch(removeFromCartProduct(item.id))
                  }
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="flex justify-between mt-6 text-lg font-semibold">
              <span>Total</span>
              <span className="text-[#13ec5b]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* CHECKOUT */}
        <div>
          <h1 className="text-2xl font-semibold mb-6 text-[#13ec5b]">
            Checkout
          </h1>

          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
            alt="gym"
            className="w-full h-44 object-cover mb-6 border border-[#1e3a29]"
          />

          <div className="space-y-4">
            {['fullName', 'email', 'address'].map((field) => (
              <div key={field}>
                {field !== 'address' ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={field === 'fullName' ? 'Full name' : 'Email'}
                    value={form[field]}
                    onChange={handleChange}
                    className={`w-full bg-[#0b0f0d] border p-3 outline-none ${
                      errors[field]
                        ? 'border-red-500'
                        : 'border-[#1e3a29] focus:border-[#13ec5b]'
                    }`}
                  />
                ) : (
                  <textarea
                    name="address"
                    rows={4}
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    className={`w-full bg-[#0b0f0d] border p-3 outline-none ${
                      errors.address
                        ? 'border-red-500'
                        : 'border-[#1e3a29] focus:border-[#13ec5b]'
                    }`}
                  />
                )}
                {errors[field] && (
                  <p className="text-sm text-red-400 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full cursor-pointer py-3 bg-[#13ec5b] text-black font-bold hover:bg-[#0fd955] disabled:opacity-50"
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
