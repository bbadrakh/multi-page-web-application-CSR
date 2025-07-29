"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/app/types/data";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    // Client-side fetch on every request
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          cache: "no-cache", // disable caching for fresh data
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result: Product = await response.json();
        setProduct(result);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <button onClick={() => router.back()} className="self-start mb-4 text-indigo-600 hover:text-indigo-800 cursor-pointer transition">
        ← Back to Products
      </button>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
            <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 mb-4">{product.title}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            <div className="mt-auto">
              <p className="text-indigo-600 font-bold text-2xl mb-2">${product.price}</p>
              <p className="text-gray-500 mb-1">Category: {product.category}</p>
              <p className="text-gray-500">
                Rating: <span className="font-medium text-gray-800">{product.rating.rate} / 5</span> ({product.rating.count} reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
