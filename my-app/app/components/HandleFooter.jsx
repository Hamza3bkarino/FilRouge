"use client";

import { usePathname } from "next/navigation";

import FooterAdmin from "./admin/Footer";
import Footer from "./Footer";

export default function HandleFooter() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? <FooterAdmin /> : <Footer />;
}
