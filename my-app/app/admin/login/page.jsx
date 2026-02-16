"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const router = useRouter();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    let isValid = true;

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Password validation
    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    if (
      form.email === ADMIN_EMAIL &&
      form.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdmin", "true");
      toast.success("Welcome Admin 🔥");
      router.push("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/50 p-8 rounded-xl w-full max-w-md space-y-5 shadow-lg"
      >
        <h1 className="text-2xl font-black uppercase text-white text-center">
          Admin Login
        </h1>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:ring-emerald-500"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:ring-emerald-500"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-emerald-500 cursor-pointer text-black font-bold uppercase py-3 rounded-lg hover:bg-emerald-400 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
