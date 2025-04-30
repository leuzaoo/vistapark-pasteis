"use client";
import React, { useState } from "react";

import { productList, ProductItem } from "@/data/products";

import ToggleSwitch from "./ToggleSwitch";
import FoodCardMenu from "./FoodCardMenu";

export default function CategoriesSection() {
  const [showSweet, setShowSweet] = useState(false);

  const options: string[] = ["Salgados", "Doces"];
  const currentValue = showSweet ? "Doces" : "Salgados";

  const filtered = productList.filter((p) => p.isSweet === showSweet);

  return (
    <section className="mx-auto max-w-3xl p-5">
      <h1 className="mb-2 text-2xl font-bold transition-all duration-500 ease-in-out sm:mb-4 sm:text-4xl sm:font-semibold">
        Categorias
      </h1>

      <ToggleSwitch
        options={options}
        value={currentValue}
        onChange={(option) => setShowSweet(option === "Doces")}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {filtered.map((item: ProductItem) => (
          <FoodCardMenu key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
