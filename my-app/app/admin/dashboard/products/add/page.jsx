"use client";

import { useState } from "react";
import { FiZap, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { addNotification } from "@/app/lib/Redux/NotificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/app/lib/Redux/productSlice";

export default function AddProduct() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_PRODUCT;
  const cloudinaryURL = process.env.NEXT_PUBLIC_CLOUDINARY;
  const Preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const dispatch = useDispatch();
  const [loadingAI, setLoadingAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  /* ------------------ Handlers ------------------ */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  /* ------------------ AI Description ------------------ */

  const handleAIDescription = async () => {
    if (!form.name) return alert("Product name is required!");

    const prompt = `Write a concise, catchy, and professional description for a fitness product named "${form.name}". 
It should be 1-2 sentences, persuasive, and focused on benefits.`;

    try {
      setLoadingAI(true);
      const res = await axios.post("/api/ai-description", { prompt });
      setForm({ ...form, description: res.data.result });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate description");
    } finally {
      setLoadingAI(false);
    }
  };

  /* ------------------ Cloudinary ------------------ */

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", Preset);

    const res = await axios.post(cloudinaryURL, formData);
    return res.data.secure_url;
  };

  /* ------------------ Submit ------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let valid = true;
    const newError = {};

    if (!form.name.trim()) {
      newError.name = "Name is required";
      valid = false;
    }
    if (!form.description.trim()) {
      newError.description = "Description is required";
      valid = false;
    }
    if (!form.price) {
      newError.price = "Price is required";
      valid = false;
    }
    if (!form.stock) {
      newError.stock = "Stock is required";
      valid = false;
    }
    if (!form.image) {
      newError.image = "Image is required";
      valid = false;
    }

    if (!valid) {
      setErrors(newError);
      setLoading(false);
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(form.image);

      const productData = {
        ...form,
        image: imageUrl,
      };

      // ✅ Redux handles API request
      await dispatch(addProduct(productData)).unwrap();

      toast.success("Product added successfully!");

      dispatch(
        addNotification({
          type: "product",
          title: "Product Added",
          message: `${form.name} added successfully`,
          type:'new'
        })
      );

      router.push("/admin/dashboard/products");
    } catch (error) {
      toast.error("Failed to add product");
      console.error(error);
    } finally {
      setLoading(false);
    }

  };

  /* ------------------ UI ------------------ */

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => router.push("/admin/dashboard/products")}
        className="cursor-pointer flex items-center gap-2 mb-6 text-gray-400 hover:text-white text-sm font-bold"
      >
        <FiArrowLeft />
        Back to Products
      </button>

      <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-6">
        Add New Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/50 p-6 rounded-xl space-y-4 shadow-md"
      >
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {errors.name && (
            <p className="text-red-600 text-[13px]">{errors.name}</p>
          )}
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-300"
          />
          {form.image && (
            <p className="text-xs text-green-400 mt-1">{form.image.name}</p>
          )}
          {errors.image && (
            <p className="text-red-600 text-[13px]">{errors.image}</p>
          )}
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
              className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {errors.price && (
              <p className="text-red-600 text-[13px]">{errors.price}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleInputChange}
              placeholder="Enter Stock"
              className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            {errors.stock && (
              <p className="text-red-600 text-[13px]">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-gray-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows={4}
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {errors.description && (
            <p className="text-red-600 text-[13px]">{errors.description}</p>
          )}

          <button
            type="button"
            onClick={handleAIDescription}
            className="flex items-center gap-2 mt-2 text-xs font-bold uppercase px-3 py-2 rounded-lg bg-gray-900/50 text-emerald-500 hover:bg-gray-900/70 transition"
          >
            <FiZap className="w-4 h-4" />
            Generate AI Description
          </button>

          {loadingAI && (
            <p className="mt-2 text-sm text-yellow-400">
              AI is generating the description...
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="cursor-pointer w-full mt-4 bg-emerald-500 text-black font-bold uppercase py-3 rounded-lg hover:bg-emerald-400 transition-shadow shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        >
          {loading ? "loading ..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
