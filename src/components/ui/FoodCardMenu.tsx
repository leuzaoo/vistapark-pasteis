"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { ShoppingBasketIcon } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { ProductItem } from "@/data/products";

interface Props {
  product: ProductItem;
}

export default function FoodCardMenu({ product }: Props) {
  const { addItem } = useCart();

  const [maxChars, setMaxChars] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 60 : 60,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");

    const handler = (e: MediaQueryListEvent) => {
      setMaxChars(e.matches ? 60 : 60);
    };

    handler(mql as unknown as MediaQueryListEvent);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const truncatedDesc =
    product.desc.length > maxChars
      ? `${product.desc.slice(0, maxChars)}...`
      : product.desc;

  return (
    <div className="flex cursor-pointer flex-col justify-between rounded-xl bg-white p-1 shadow-sm">
      <Image
        className="h-72 w-full rounded-lg object-cover object-bottom shadow-md transition-all duration-500 ease-in-out"
        src={product.image}
        width={1024}
        height={768}
        quality={100}
        alt={`${product.name} image`}
      />
      <div className="flex flex-col px-2 py-2">
        <div className="flex flex-col">
          <h3 className="font-unbounded text-2xl font-medium normal-case transition-all duration-500 ease-in-out first-letter:uppercase sm:text-2xl">
            {product.name}
          </h3>
          <p className="text-dark/60 font-light sm:text-lg">{truncatedDesc}</p>
        </div>

        <div className="mt-5 flex w-full items-center justify-between">
          <p className="font-unbounded text-2xl font-bold transition-all duration-500 ease-in-out">
            {formatCurrency(product.price)}
          </p>
          <motion.button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem({
                id: product.id,
                name: product.name,
                qty: 1,
                image: product.image,
                price: product.price,
              });
            }}
            whileTap={{ scale: 1.2 }}
            className="bg-primary-red size-8 cursor-pointer place-items-end rounded-lg text-center"
          >
            <ShoppingBasketIcon className="text-light mx-auto size-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
