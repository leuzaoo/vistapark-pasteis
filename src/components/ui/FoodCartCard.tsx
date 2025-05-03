"use client";

import { PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { formatCurrency } from "@/utils/formatCurrency";
import { CartItem } from "@/contexts/CartContext";
import { ProductItem } from "@/data/products";

import AddRemoveButton from "./AddRemoveButton";

interface CartItemCardProps {
  item: CartItem;
  product: ProductItem;
  length: number;
  onAdd: () => void;
  onDecrease: () => void;
  onDeleteItem: () => void;
  onUpdateNotes: (notes: string) => void;
  onEditExtras: () => void;
}

export default function FoodCartCard({
  item,
  product,
  length,
  onAdd,
  onDecrease,
  onUpdateNotes,
  onDeleteItem,
  onEditExtras,
}: CartItemCardProps) {
  const totalPrice = product.price * item.qty;

  return (
    <div className="relative">
      <div className="relative z-50 mb-16 flex gap-2 rounded-xl bg-white p-2 shadow-sm">
        <Image
          src={product.image}
          width={1024}
          height={768}
          quality={100}
          alt={`${product.name} image`}
          className="size-24 rounded-lg shadow-md"
        />
        <div className="flex w-full flex-col items-start justify-between pl-1">
          <div className="flex w-full justify-between">
            <p className="font-medium">{product.name}</p>
            <Trash2Icon size={20} onClick={onDeleteItem} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-unbounded font-bold">
              {formatCurrency(totalPrice)}
            </span>
            <span className="font-unbounded text-dark/60 text-xs font-light">
              x{length}
            </span>
          </div>
          <div className="flex w-full items-center justify-between">
            <AddRemoveButton
              decrease={onDecrease}
              increase={onAdd}
              quantity={item.qty}
              disabled={item.qty === 0}
              isZero={item.qty === 0}
            />
            <button
              className="bg-primary-red 0 cursor-pointer rounded-md text-white hover:opacity-70"
              onClick={onEditExtras}
              title="Adicionais"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-primary-yellow/25 absolute -bottom-9 z-10 w-full rounded-b-xl px-4 py-2 pt-6 shadow-sm">
        <input
          type="text"
          placeholder="Observações"
          value={item.notes || ""}
          onChange={(e) => onUpdateNotes(e.target.value)}
          className="text-dark border-dark/20 placeholder-dark/40 w-full border-b bg-transparent placeholder:text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
