'use client';

import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/lib/Redux/cartProgramSlice';

export default function ProgramCards({programs }) {

  const dispatch = useDispatch();
  
  
  const router = useRouter();

  // ADD TO CART HANDLER
  const handleAddToCart = (program) => {
    dispatch(addToCart(program));
  };

    // PAGINATION LOGIC
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(programs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPrograms = programs.slice(
      startIndex,
      startIndex + itemsPerPage
    );



  return (
    <div className="min-h-screen bg-[#050b07] text-white font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPrograms.map((program) => (
            <div
              key={program.id}
              className="group flex flex-col bg-[#102216] rounded-2xl overflow-hidden border border-white/5 hover:border-[#13ec5b]/30 transition-all hover:shadow-[0_0_20px_rgba(19,236,91,0.1)] hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden">
                
                {/* STATUS BADGE (LEFT) */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide backdrop-blur-md
                      ${
                        program.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                      }`}
                  >
                    {program.status}
                  </span>
                </div>

                {/* CART ICON (RIGHT) */}
                <div className="absolute top-3 right-3 z-10 ">
                  <button
                    onClick={() => handleAddToCart(program)}
                    className="bg-black/50 hover:bg-[#13ec5b] hover:text-black text-white p-2 cursor-pointer rounded-full backdrop-blur-md transition"
                  >
                    <FiShoppingCart size={16} />
                  </button>
                </div>

                {/* BACKGROUND IMAGE */}
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{
                    backgroundImage: `url("${program.image}")`,
                    backgroundPosition: program.imagePosition || 'center',
                  }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-[#102216] via-transparent to-transparent opacity-90" />

                {/* TITLE */}
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <h3 className="text-2xl font-black uppercase italic mb-1 group-hover:text-[#13ec5b] transition">
                    {program.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-300 uppercase">
                    {program.price} $
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 pt-2 flex flex-col gap-4 flex-1">
                
                {/* STATS */}
                <div className="grid grid-cols-3 gap-2 py-3 border-b border-white/5">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Level</span>
                    <span className="block text-sm font-bold">{program.level}</span>
                  </div>
                  <div className="border-l border-white/5 pl-3">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Duration</span>
                    <span className="block text-sm font-bold">{program.duration}</span>
                  </div>
                  <div className="border-l border-white/5 pl-3">
                    <span className="text-[10px] text-gray-500 uppercase font-bold">Goal</span>
                    <span className="block text-sm font-bold">{program.goal}</span>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between bg-black/20 p-2 rounded-lg">
                    <button
                      onClick={() => handleAddToCart(program)}
                      className="flex items-center gap-2 text-xs font-bold bg-[#13ec5b] cursor-pointer text-black px-3 py-1.5 rounded-md hover:bg-[#10c94d] transition"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>

                    <button className="text-xs cursor-pointer font-bold hover:text-[#13ec5b] transition flex items-center gap-1"
                      onClick={()=>router.push(`/programs/${program.id}`)}
                    >
                      View
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-2 rounded bg-white/10 disabled:opacity-40 cursor-pointer"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded font-bold cursor-pointer
                  ${
                    currentPage === i + 1
                      ? 'bg-[#13ec5b] text-black'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 rounded bg-white/10 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>

    
  );
}
