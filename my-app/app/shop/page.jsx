'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation"; // Next.js hook
import { fetchProducts } from "../lib/Redux/productSlice";
import ProductCard from "../components/Shop/ProductCard";
import SportAIHeaderSection from "../components/Shop/SportHeaderSection";

export default function Shop() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.products);

  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update category if URL changes (optional, reactive)
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory);
    }
  }, [searchParams, category]);

  // 🔥 FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return items.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, category]);

  return (
    <>
      <SportAIHeaderSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
        total={filteredProducts.length}
        onReset={() => {
          setSearchQuery("");
          setCategory("All");
        }}
      />

      <ProductCard data={filteredProducts} />
    </>
  );
}
