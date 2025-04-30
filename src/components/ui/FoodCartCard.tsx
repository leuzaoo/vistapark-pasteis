"use client";

import Image from "next/image";
import React from "react";

import { formatCurrency } from "@/utils/formatCurrency";
import { CartItem } from "@/contexts/CartContext";
import { ProductItem } from "@/data/products";

import AddRemoveButton from "./AddRemoveButton";

interface CartItemCardProps {
  item: CartItem;
  product: ProductItem;
  onAdd: () => void;
  onDecrease: () => void;
  onUpdateNotes: (notes: string) => void;
}

export default function CartItemCard({
  item,
  product,
  onAdd,
  onDecrease,
  onUpdateNotes,
}: CartItemCardProps) {
  const totalPrice = product.price * item.qty;

  return (
    <div key={item.id} className="relative">
      <div className="relative z-50 mt-5 mb-14 flex w-full items-center gap-2 rounded-3xl bg-white shadow-sm">
        <div className="ml-2 size-20 py-2">
          <Image
            src={product.image}
            width={1024}
            height={768}
            quality={100}
            alt={`${product.name} image`}
            className="size-16 rounded-2xl shadow-md"
          />
        </div>
        <div className="w-full flex-col justify-between gap-5 pl-1">
          <div className="flex w-full justify-between">
            <p>{product.name}</p>
          </div>
          <div className="flex w-full items-end justify-between pr-3">
            <span className="text-xl font-semibold">
              {formatCurrency(totalPrice)}
            </span>
            <AddRemoveButton
              decrease={onDecrease}
              increase={onAdd}
              quantity={item.qty}
              disabled={item.qty === 0}
              isZero={item.qty === 0}
            />
          </div>
        </div>
      </div>
      <div className="bg-primary-yellow/25 absolute -bottom-9 z-10 w-full rounded-b-xl px-4 py-2 pt-6 shadow-sm">
        <input
          type="text"
          placeholder="Observações (ex: Remover cebola)"
          value={item.notes || ""}
          onChange={(e) => onUpdateNotes(e.target.value)}
          className="text-dark border-dark/20 placeholder-dark/40 w-full border-b bg-transparent placeholder:text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
