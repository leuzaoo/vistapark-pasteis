import React, { useState } from "react";

import { productList, type ProductItem } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

import ToggleSwitch from "./ToggleSwitch";

export default function CategoriesSection() {
  const [showSweet, setShowSweet] = useState(false);

  const { addItem } = useCart();

  const options = ["Salgados", "Doces"];
  type Category = (typeof options)[number];

  const currentValue: Category = !showSweet ? "Salgados" : "Doces";

  const filtered = productList.filter((p) => p.isSweet === showSweet);

  return (
    <section className="mx-auto max-w-3xl p-5">
      <h1 className="mb-2 text-2xl transition-all duration-500 ease-in-out md:mb-4 md:text-5xl">
        Categorias
      </h1>

      <ToggleSwitch
        options={options as string[]}
        value={currentValue}
        onChange={(option) => setShowSweet(option === "Doces")}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {filtered.map((item: ProductItem) => (
          <div key={item.id} className="flex flex-col rounded border p-4">
            <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
            <p className="mb-4">R$ {item.price.toFixed(2)}</p>
            <button
              onClick={() => addItem({ id: item.id, name: item.name, qty: 1 })}
              className="text-light bg-blue-500 py-2"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
