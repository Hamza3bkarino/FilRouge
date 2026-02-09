'use client'
import React from 'react';
import { FiSearch, FiStar, FiChevronDown } from 'react-icons/fi';

export default function SportAIHeaderSection({
  searchQuery,
  setSearchQuery,
  category,
  setCategory,
  onReset,
  total
}) {
  return (
    <div className="bg-[#050b07] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic">
              Shop{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#13ec5b] to-green-400">
                Gear & Fuel
              </span>
            </h1>
            <p className="text-gray-400">
              AI-curated recommendations for your training style.
            </p>
          </div>

          {/* SEARCH */}
          <div className="w-full md:max-w-md">
            <label className="block text-xs font-bold text-[#13ec5b] uppercase mb-2">
              AI Product Finder
            </label>

            <div className="flex items-center bg-[#102216] rounded-xl border border-white/10">
              <FiStar className="text-[#13ec5b] mx-4" />
              <input
                className="w-full bg-transparent py-3 text-sm outline-none"
                placeholder="Try 'protein', 'dumbbell'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="mx-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/5 py-4">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#102216] border border-[#13ec5b]/40 text-[#13ec5b] text-sm font-bold uppercase"
          >
            <option value="All">All Categories</option>
            <option value="Equipment">Equipment</option>
            <option value="Accessories">Accessories</option>
            <option value="Nutrition">Nutrition</option>
          </select>

          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs text-gray-500">
              Showing {total} Products
            </span>
            <button
              onClick={onReset}
              className="text-sm text-gray-400 hover:text-[#13ec5b] underline"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
