"use client";
import { useState } from "react";
import Link from "next/link";

import { productList, ProductItem } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

import Navbar from "@/components/ui/Navbar";

export default function Home() {
  const [showSweet, setShowSweet] = useState(true);
  const { addItem } = useCart();

  const filtered = productList.filter((p) => p.isSweet === showSweet);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl p-4">
        <div className="mb-6 flex items-center justify-center space-x-4">
          <button
            onClick={() => setShowSweet(true)}
            className={`rounded px-4 py-2 ${
              showSweet ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Doces
          </button>
          <button
            onClick={() => setShowSweet(false)}
            className={`rounded px-4 py-2 ${
              !showSweet ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Salgados
          </button>
          <Link href="/checkout" className="bg-red-500 px-4 py-2 text-white">
            Carrinho
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filtered.map((p: ProductItem) => (
            <div key={p.id} className="flex flex-col rounded border p-4">
              <h3 className="mb-2 text-lg font-semibold">{p.name}</h3>
              <p className="mb-4">R$ {p.price.toFixed(2)}</p>
              <button
                onClick={() => addItem({ id: p.id, name: p.name, qty: 1 })}
                className="mt-auto rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
