'use client'
import React, { useState } from 'react';
import { FiSearch, FiStar, FiChevronDown } from 'react-icons/fi';

export default function SportAIHeaderSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'Category:', category);
  };

  return (
    <div className=" bg-[#050b07] text-white font-sans p-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
              Shop{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#13ec5b] to-green-400">
                Gear & Fuel
              </span>
            </h1>
            <p className="text-gray-400 font-medium">
              Equip yourself with premium gear and supplements, featuring AI-curated recommendations for your training style.
            </p>
          </div>

          {/* AI Product Finder */}
          <div className="w-full md:w-auto flex-1 md:max-w-md">
            <label className="block text-xs font-bold text-[#13ec5b] uppercase mb-2 ml-1">
              AI Product Finder
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-r from-[#13ec5b]/20 to-green-400/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center bg-[#102216] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#13ec5b]/50 transition-colors">
                <FiStar className="w-5 h-5 text-[#13ec5b] mx-4 animate-pulse" />
                <input
                  className="w-full bg-transparent border-none text-white placeholder-gray-500 py-3 text-sm focus:outline-none focus:ring-0"
                  placeholder="Try 'High protein vegan powder'..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="mr-2 p-1.5 rounded-lg bg-white/5 hover:bg-[#13ec5b] hover:text-black text-white transition-all"
                >
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-3 items-center py-4 border-b border-white/5">
          <FiStar className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-bold uppercase text-gray-500 mr-2 hidden sm:block">
            Filter By:
          </span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#102216] border border-[#13ec5b]/40 text-[#13ec5b] text-sm font-bold uppercase hover:bg-[#13ec5b]/10 transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="Equipment">Equipment</option>
            <option value="Accessories">Accessories</option>
            <option value="Nutrition">Nutrition</option>
          </select>

          <button className="px-4 py-2 rounded-lg bg-[#102216] border border-white/10 text-gray-300 text-sm font-bold uppercase hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
            Price Range <FiChevronDown className="w-4 h-4" />
          </button>

          <button className="px-4 py-2 rounded-lg bg-[#102216] border border-white/10 text-gray-300 text-sm font-bold uppercase hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
            Brand <FiChevronDown className="w-4 h-4" />
          </button>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs font-medium text-gray-500 hidden sm:block">
              Showing 6 Products
            </span>
            <button className="text-sm text-gray-400 hover:text-[#13ec5b] underline decoration-gray-600 underline-offset-4 decoration-1">
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
