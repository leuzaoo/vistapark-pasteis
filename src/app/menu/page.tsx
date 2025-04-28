"use client";
import { useState } from "react";

import { useCart } from "@/contexts/CartContext";

interface ProductItem {
  id: number;
  name: string;
  price: number;
  isSweet: boolean;
}

// todo: create a js file to render all products
const productList: ProductItem[] = [
  { id: 1, name: "Pastel de Queijo", price: 8.5, isSweet: false },
  { id: 2, name: "Pastel de Carne", price: 9.0, isSweet: false },
  { id: 3, name: "Pastel de Chocolate", price: 7.5, isSweet: true },
  { id: 4, name: "Pastel de Banana com Canela", price: 8.0, isSweet: true },
];

export default function Home() {
  const [showSweet, setShowSweet] = useState(true);
  const { addItem } = useCart();

  const filtered = productList.filter((p) => p.isSweet === showSweet);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setShowSweet(true)}
          className={`px-4 py-2 rounded ${
            showSweet ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Doces
        </button>
        <button
          onClick={() => setShowSweet(false)}
          className={`px-4 py-2 rounded ${
            !showSweet ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Salgados
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filtered.map((p) => (
          <div key={p.id} className="border rounded p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">{p.name}</h3>
            <p className="mb-4">R$ {p.price.toFixed(2)}</p>
            <button
              onClick={() => addItem({ id: p.id, name: p.name, qty: 1 })}
              className="mt-auto bg-green-500 hover:bg-green-600 text-white rounded px-3 py-1"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
