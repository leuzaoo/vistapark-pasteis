"use client";
import React from "react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import EmptyCartLayout from "@/components/pages/EmptyCartLayout";
import CartItemCard from "@/components/ui/FoodCartCard";
import HeaderCart from "@/components/ui/HeaderCart";

const CartPage = () => {
  const { cart, addItem, removeQty, updateNotes } = useCart();

  if (cart.length === 0) {
    return <EmptyCartLayout />;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6 p-8">
      <HeaderCart />

      {cart.map((item: CartItem) => {
        const product = productList.find((p) => p.id === item.id);
        if (!product) return null;

        return (
          <CartItemCard
            key={item.id}
            item={item}
            product={product}
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
            onUpdateNotes={(notes) => updateNotes(item.id, notes)}
          />
        );
      })}
    </div>
  );
};

export default CartPage;
