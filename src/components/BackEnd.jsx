import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BackEnd() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

 
  if (products.length === 0) {
    return <h2 className="text-center mt-20"> Yuklanmoqda...</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow-lg bg-white hover:shadow-2xl transition"
          >
           
            <Link to={`/detail/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {product.title}
              </h2>
            </Link>

            
            <p className="text-green-600 font-bold text-xl mb-2">
              ${product.price}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Kategoriya: {product.category}
            </p>
            <p className="text-yellow-600 font-medium">
              ⭐ {product.rating.rate} ({product.rating.count} ta ovoz)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
