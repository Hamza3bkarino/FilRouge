'use client'

import React from 'react';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

export default function FooterAdmin() {
  return (
    <footer className="bg-gray-900 border-t border-white/10 py-4  ">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm bottom-0">
        
        {/* Admin Logo/Title */}
        <div className="flex items-center gap-2">
          <MdOutlineAdminPanelSettings className="text-3xl text-green-500" />
          <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white">
            SportAI
            <span className="ml-2 text-xs font-bold not-italic px-2 py-0.5 rounded border border-green-500/40 text-green-500 bg-green-500/10">
              ADMIN
            </span>
          </h1>
        </div>

        {/* Footer Links */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
