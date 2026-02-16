"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import NavbarAdmin from "./admin/Navbar";

export default function Header() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin/dashboard");

  return isAdminRoute ? <NavbarAdmin /> : <Navbar />;
}
