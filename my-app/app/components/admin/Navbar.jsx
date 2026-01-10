"use client";

import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiBell,
  FiHome,
  FiBox,
  FiActivity,
  FiShoppingCart,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background-dark/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <MdOutlineAdminPanelSettings className="text-3xl text-green-500" />
          <h1 className="text-xl md:text-2xl font-black uppercase italic tracking-tight text-white">
            SportAI
            <span className="ml-2 text-xs font-bold not-italic px-2 py-0.5 rounded border border-green-500/40 text-green-500 bg-green-500/10">
              ADMIN
            </span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/admin/dashboard"
            className={`text-sm font-bold uppercase tracking-wide pb-0.5 transition-colors ${
              pathname === "/admin/dashboard"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            href="/admin/dashboard/products"
            className={`text-sm font-bold uppercase tracking-wide transition-colors ${
              pathname.startsWith("/admin/dashboard/products")
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Products
          </Link>

          <Link
            href="/admin/dashboard/programs"
            className={`text-sm font-bold uppercase tracking-wide transition-colors ${
              pathname.startsWith("/admin/dashboard/programs")
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Programs
          </Link>

          <Link
            href="/orders"
            className="text-sm font-bold uppercase tracking-wide text-gray-400 hover:text-white transition-colors"
          >
            Orders
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="size-9 flex items-center justify-center rounded-full bg-surface-dark border border-white/10 text-gray-400 hover:text-white hover:border-green-500/50 transition">
            <FiBell />
          </button>

          {/* Admin */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-white/10">
            <div className="size-8 rounded-full bg-linear-to-tr from-green-500 to-emerald-500 p-px">
              <div className="size-full rounded-full bg-background-dark flex items-center justify-center">
                <span className="text-xs font-bold text-green-500">AD</span>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-400">Admin User</span>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background-dark border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <MobileLink icon={<FiHome />} label="Dashboard" />
            <MobileLink icon={<FiBox />} label="Products" />
            <MobileLink icon={<FiActivity />} label="Programs" />
            <MobileLink icon={<FiShoppingCart />} label="Orders" />
          </nav>
        </div>
      )}
    </header>
  );
}

/* Mobile Nav Item */
function MobileLink({ icon, label }) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-dark border border-white/10 text-gray-300 hover:text-white hover:border-green-500/40 transition"
    >
      {icon}
      <span className="text-sm font-bold uppercase">{label}</span>
    </Link>
  );
}
