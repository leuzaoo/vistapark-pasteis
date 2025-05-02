import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { productList } from "@/data/products";

export default function PriceInfosSection() {
  const { cart, totalItems } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const product = productList.find((p) => p.id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  return (
    <div className="border-dark/20 absolute right-0 bottom-0 left-0 z-50 mx-auto flex w-full max-w-2xl flex-col rounded-t-3xl border-t bg-white p-5 shadow-md">
      <div className="flex w-full items-center justify-between">
        <p className="transition-all duration-300 ease-in-out">Quantidade</p>
        <p className="font-unbounded text-lg font-bold transition-all duration-300 ease-in-out">
          x{totalItems}
        </p>
      </div>
      <div className="mt-3 flex w-full items-center justify-between">
        <p className="transition-all duration-300 ease-in-out">Valor total</p>
        <p className="font-unbounded text-lg font-bold transition-all duration-300 ease-in-out">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      <Link
        href="/checkout"
        className="text-light relative mx-auto mt-5 flex w-full items-center justify-center rounded-lg bg-green-600 py-2"
      >
        <p className="text-xl">Finalizar</p>
        <ChevronRightIcon className="absolute right-4" />
      </Link>
    </div>
  );
}
