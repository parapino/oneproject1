import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Products({ products }) {
  const [search, setSearch] = useState("");

  // Filtirlash
  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      {/* Search */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full py-3 pl-12 pr-4 rounded-xl border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none shadow transition-all duration-200 text-lg bg-white dark:bg-gray-800 dark:text-white"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-xl pointer-events-none" />
        </div>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-xl py-10">
            <span className="text-4xl">😔</span>
            <div>No products found</div>
          </div>
        ) : (
          filtered.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-all duration-200 p-4 flex flex-col items-center">
              <img src={product.thumbnail} alt={product.title} className="w-32 h-32 object-contain mb-4 rounded-lg bg-gray-100 dark:bg-gray-700" />
              <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">{product.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{product.description}</p>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2">${product.price}</span>
              {/* Add to cart button */}
              <button className="mt-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}