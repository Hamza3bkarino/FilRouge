"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return <>{children}</>;
}
