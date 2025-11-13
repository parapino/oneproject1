import React, { useState } from "react";

export default function Rasmlar() {
  // O'zingizning rasmlar massivini to'ldiring
  const rasmlar = [
    // ...yana rasmlar
  ];
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {rasmlar.map((rasm, idx) => (
          <div
            key={rasm.id}
            onClick={() => {
              setSelectedId(rasm.id);
              setSelectedIndex(idx);
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 w-64"
          >
            <h2 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white line-clamp-2 text-center">
              {rasm.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
