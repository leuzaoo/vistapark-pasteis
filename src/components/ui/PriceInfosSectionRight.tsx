import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { productList } from "@/data/products";

export default function PriceInfosSectionRight() {
  const { cart, totalItems } = useCart();

  const totalPrice = cart.reduce((sum, item) => {
    const product = productList.find((p) => p.id === item.id);
    if (!product) return sum;
    return sum + product.price * item.qty;
  }, 0);

  return (
    <div className="hidden h-full flex-col justify-between rounded-xl bg-white p-2 shadow-sm sm:flex">
      <div className="flex h-full flex-col justify-between">
        <ul className="space-y-0">
          {cart.map((item: CartItem) => {
            const product = productList.find((p) => p.id === item.id);
            if (!product) return null;

            const itemsFinalPrice = product.price * item.qty;

            return (
              <li key={item.id} className="border-dark/30 border-b py-2">
                <div className="flex items-end justify-between">
                  <div className="flex w-full flex-col items-start justify-between">
                    <h2 className="font-unbounded text-sm font-light">
                      {item.name}
                    </h2>
                    {item.extras && item.extras.length > 0 && (
                      <p className="text-xs font-bold">
                        Extras:{" "}
                        <span className="font-normal">
                          {item.extras.join(", ")}
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="font-unbounded flex items-center gap-1 text-xs">
                    <span className="text-dark/60">{item.qty}x</span>
                    <span className="font-bold">
                      {formatCurrency(itemsFinalPrice)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <div className="flex w-full items-center justify-between">
            <span>Quantidade</span>
            <span className="font-unbounded font-bold">x{totalItems}</span>
          </div>
          <div className="mt-2 flex w-full items-center justify-between">
            <span>Valor total</span>
            <span className="font-unbounded font-bold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="text-light relative mx-auto mt-3 flex w-full items-center justify-center rounded-lg bg-green-600 py-2 text-xl"
          >
            Finalizar
            <ChevronRightIcon className="absolute right-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
