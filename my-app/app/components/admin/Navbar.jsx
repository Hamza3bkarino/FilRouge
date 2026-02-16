"use client";

import { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiBell,
  FiHome,
  FiBox,
  FiActivity,
  FiShoppingCart,
  FiTrash2
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotification,
  markAllRead,
  markAsRead
} from "@/app/lib/Redux/NotificationSlice";

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const adminRef = useRef(null);
  const notifRef = useRef(null);

  const notifications = useSelector(
    (state) => state.notifications.items
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotifColor = (type) => {
    switch(type) {
      case "new": return "bg-green-900/50 text-white";
      case "updated": return "bg-blue-900/50 text-white";
      case "deleted": return "bg-red-900 text-white";
      default: return "bg-gray-900 text-white";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setShowAdminMenu(false);
      }

      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <NavLink href="/admin/dashboard" active={pathname === "/admin/dashboard"}>
            Dashboard
          </NavLink>
          <NavLink
            href="/admin/dashboard/products"
            active={pathname.startsWith("/admin/dashboard/products")}
          >
            Products
          </NavLink>
          <NavLink
            href="/admin/dashboard/programs"
            active={pathname.startsWith("/admin/dashboard/programs")}
          >
            Programs
          </NavLink>
          <NavLink href="/admin/dashboard/orders" active={pathname === "/admin/dashboard/orders"}>
            Orders
          </NavLink>
        </nav>

        {/* Right Actions */}
        <div className="relative flex items-center gap-3">

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(prev => !prev)}
              className="cursor-pointer relative size-9 flex items-center justify-center rounded-full bg-surface-dark border border-white/10 text-gray-400 hover:text-white hover:border-green-500/50 transition"
            >
              <FiBell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-black border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    Notifications
                  </h3>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(markAllRead())}
                      className="text-xs text-green-500 hover:underline"
                    >
                      Mark all
                    </button>

                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto bg-green-950">
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400 px-4 py-6 text-center">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`flex justify-between gap-3 px-4 py-3 border-b border-white/5 transition
                          ${getNotifColor(item.type)}
                          ${item.read ? " opacity-50" : ""}
                        `}
                        onClick={() => dispatch(markAsRead(item.id))}
                      >
                        <div className="flex-1 cursor-pointer">
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="text-xs mt-1">{item.message}</p>
                          <p className="text-[10px] text-gray-500 mt-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => dispatch(deleteNotification(item.id))}
                          className="self-start text-gray-400 hover:text-red-500 transition"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Admin Dropdown */}
          <div
            ref={adminRef}
            className="relative hidden md:flex items-center pl-3 border-l border-white/10"
          >
            <div
              onClick={() => setShowAdminMenu(prev => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="size-8 rounded-full bg-linear-to-tr from-green-500 to-emerald-500 p-px">
                <div className="size-full rounded-full bg-background-dark flex items-center justify-center">
                  <span className="text-xs font-bold text-green-500">AD</span>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-400">
                Admin User
              </span>
            </div>

            {showAdminMenu && (
              <div className="absolute -right-8 top-12 w-40 bg-surface-dark border border-white/10 rounded-lg shadow-xl z-50">
                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 bg-red-500/20 transition rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden size-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background-dark border-t border-white/10">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <MobileLink href="/admin/dashboard" icon={<FiHome />} label="Dashboard" />
            <MobileLink href="/admin/dashboard/products" icon={<FiBox />} label="Products" />
            <MobileLink href="/admin/dashboard/programs" icon={<FiActivity />} label="Programs" />
            <MobileLink href="/admin/dashboard/orders" icon={<FiShoppingCart />} label="Orders" />
          </nav>
        </div>
      )}
    </header>
  );
}

/* Desktop Link */
function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`text-sm font-bold uppercase tracking-wide transition-colors pb-0.5 ${
        active
          ? "text-green-500 border-b-2 border-green-500"
          : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}

/* Mobile Link */
function MobileLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface-dark border border-white/10 text-gray-300 hover:text-white hover:border-green-500/40 transition"
    >
      {icon}
      <span className="text-sm font-bold uppercase">{label}</span>
    </Link>
  );
}
