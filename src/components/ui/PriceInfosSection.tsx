import { ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";

import { calculateTotalPrice } from "@/utils/totalPrice";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import DelayedLink from "./DelayedLink";

export default function PriceInfosSection() {
  const { cart, totalItems } = useCart();

  const totalPrice = calculateTotalPrice(cart, productList);

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

      <DelayedLink
        href="/checkout"
        className="text-light bg-primary-blue relative mx-auto mt-5 flex w-full cursor-pointer items-center justify-center rounded-lg py-2"
      >
        Pagamento/Entrega
        <ChevronRightIcon className="absolute right-4" />
      </DelayedLink>
    </div>
  );
}
