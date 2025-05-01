"use client";
import React from "react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import PriceInfosSection from "@/components/ui/PriceInfosSection";
import EmptyCartLayout from "@/components/pages/EmptyCartLayout";
import FoodCartCard from "@/components/ui/FoodCartCard";
import HeaderCart from "@/components/ui/HeaderCart";

const CartPage = () => {
  const { cart, addItem, removeQty, updateNotes, removeItem } = useCart();

  if (cart.length === 0) {
    return <EmptyCartLayout />;
  }

  return (
    <div className="relative mx-auto h-screen max-w-3xl px-4 py-8 md:px-0">
      <HeaderCart href="/menu" />

      <div className="h-[465px] overflow-y-auto pr-3">
        {cart.map((item: CartItem) => {
          const product = productList.find((p) => p.id === item.id);
          if (!product) return null;

          return (
            <FoodCartCard
              key={item.id}
              item={item}
              product={product}
              length={item.qty}
              onAdd={() =>
                addItem({
                  id: item.id,
                  name: item.name,
                  qty: 1,
                  image: item.image,
                  price: item.price,
                })
              }
              onDecrease={() => removeQty(item.id, 1)}
              onDeleteItem={() => removeItem(item.id)}
              onUpdateNotes={(notes) => updateNotes(item.id, notes)}
            />
          );
        })}
      </div>
      <PriceInfosSection />
    </div>
  );
};

export default CartPage;
