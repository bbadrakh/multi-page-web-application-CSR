"use client";

import React, { useState, useEffect } from "react";
import { Product } from "./types/data";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex items-center justify-between pl-20 pr-12">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Product Showcase</h1>
          <p className="text-gray-600">Explore our managed list of products fetched via CSR</p>
        </div>
        <div className="flex w-1/2 items-center justify-around">
          <a href="/" className="text-xl font-medium">
            Product
          </a>
          <a href="/" className="text-xl font-medium">
            Features
          </a>
          <a href="/" className="text-xl font-medium">
            Color
          </a>
          <a href="/" className="text-xl font-medium">
            More products
          </a>
          <button className="bg-blue-600 hover: cursor-pointer hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Order now
          </button>
        </div>
      </header>

      {data ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <Link href={`./products/${item.id}`} key={item.id} className="block">
              <li key={item.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
                <img src={item.image} alt={item.title} className="w-32 h-32 object-contain mb-4" />
                <h2 className="text-lg font-semibold text-gray-800 mb-2 text-center">{item.title}</h2>
                <p className="text-indigo-600 font-bold mb-2">${item.price}</p>
                <p className="text-gray-600 text-sm text-center">{item.category}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl">Loading...</p>
        </div>
      )}
    </div>
  );
}
