import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { productList } from "@/data/products";

const PriceInfosSection = () => {
  const { cart, totalItems } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const product = productList.find((p) => p.id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  return (
    <div className="border-dark/20 absolute right-0 bottom-0 left-0 z-50 mx-auto flex w-full max-w-2xl flex-col rounded-t-3xl border-t bg-white p-5 shadow-md">
      <div className="flex w-full items-center justify-between">
        <p className="text-xl transition-all duration-300 ease-in-out sm:text-3xl sm:font-medium">
          Quantidade
        </p>
        <p className="font-unbounded text-2xl font-bold transition-all duration-300 ease-in-out sm:text-3xl">
          x{totalItems}
        </p>
      </div>
      <div className="mt-3 flex w-full items-center justify-between">
        <p className="text-xl transition-all duration-300 ease-in-out sm:text-3xl sm:font-medium">
          Valor total
        </p>
        <p className="font-unbounded text-2xl font-bold transition-all duration-300 ease-in-out sm:text-3xl">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      <Link
        href="/checkout"
        className="text-light mx-auto mt-5 flex w-full items-center gap-8 rounded-xl bg-green-600 py-4 pr-4 pl-16"
      >
        <p className="text-2xl font-semibold">Finalizar pedido</p>
        <ChevronRightIcon />
      </Link>
    </div>
  );
};

export default PriceInfosSection;
