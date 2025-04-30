"use client";

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import { productList, ProductItem } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

import FoodInfosCard from "./FoodInfosCard";
import ToggleSwitch from "./ToggleSwitch";
import FoodCardMenu from "./FoodCardMenu";

export default function CategoriesSection() {
  const [showSweet, setShowSweet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );
  const [quantity, setQuantity] = useState(0);
  const { cart, addItem, removeQty } = useCart();

  const options: string[] = ["Salgados", "Doces"];
  const currentValue = showSweet ? "Doces" : "Salgados";
  const filtered = productList.filter((p) => p.isSweet === showSweet);

  const openCard = (product: ProductItem) => {
    setSelectedProduct(product);

    const existing = cart.find((i) => i.id === product.id)?.qty ?? 0;
    setQuantity(existing);
  };

  const closeCard = () => setSelectedProduct(null);

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const existing = cart.find((i) => i.id === selectedProduct.id)?.qty ?? 0;
    const diff = quantity - existing;

    if (diff > 0) {
      addItem({
        id: selectedProduct.id,
        name: selectedProduct.name,
        qty: diff,
      });
    } else if (diff < 0) {
      removeQty(selectedProduct.id, Math.abs(diff));
    }

    closeCard();
  };

  return (
    <>
      <section className="mx-auto max-w-3xl p-5">
        <h1 className="mb-2 text-2xl font-bold transition-all duration-500 ease-in-out sm:mb-4 sm:text-4xl sm:font-semibold">
          Categorias
        </h1>

        <ToggleSwitch
          options={options}
          value={currentValue}
          onChange={(option) => setShowSweet(option === "Doces")}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filtered.map((item) => (
            <div key={item.id} onClick={() => openCard(item)}>
              <FoodCardMenu product={item} />
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct && (
          <FoodInfosCard
            product={selectedProduct}
            isOpen={!!selectedProduct}
            quantity={quantity}
            onClose={closeCard}
            onQuantityChange={(q) => setQuantity(Math.max(0, q))}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}
