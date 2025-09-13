import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-20"> Yuklanmoqda...</h2>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
         Orqaga
      </Link>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain border rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-green-600 font-bold text-xl mb-2">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Kategoriya: {product.category}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-yellow-600 font-medium">
             {product.rating.rate} ({product.rating.count} )
          </p>
        </div>
      </div>
    </div>
  );
}
