'use client';

import React, { useState } from 'react';
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiHeart,
  FiZap,
} from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'PROGRAMS', path: '/programs' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <FiZap size={26} className="text-green-500" />
            <span className="text-white text-xl font-black uppercase italic">
              SportAI
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 font-bold">
            {links.map(({ name, path }) => {
              const isActive = pathname === path;

              return (
                <Link
                  key={name}
                  href={path}
                  className={`relative pb-1 transition-colors text-[15px]
                    ${
                      isActive
                        ? 'text-green-500'
                        : 'text-[#dddd] hover:text-green-500'
                    }
                  `}
                >
                  {name}

                  {/* Green underline */}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-green-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <FiSearch className="nav-icon" />
            <FiHeart className="nav-icon" />
            <FiShoppingBag className="nav-icon" />
            <FiUser className="nav-icon" />
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <FiSearch className="nav-icon" />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <FiX size={26} className="text-green-500" />
              ) : (
                <FiMenu size={26} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10 font-bold">
              {links.map(({ name, path }) => {
                const isActive = pathname === path;

                return (
                  <Link
                    key={name}
                    href={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`transition-colors ${
                      isActive
                        ? 'text-green-500'
                        : 'hover:text-green-500'
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}

              <div className="flex gap-6 pt-4 border-t border-white/10">
                <FiHeart className="nav-icon" />
                <FiShoppingBag className="nav-icon" />
                <FiUser className="nav-icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
