"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { PlusIcon } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { ProductItem } from "@/data/products";

interface Props {
  product: ProductItem;
}

export default function FoodCardMenu({ product }: Props) {
  const { addItem } = useCart();

  const [maxChars, setMaxChars] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 35 : 60,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");

    const handler = (e: MediaQueryListEvent) => {
      setMaxChars(e.matches ? 60 : 35);
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
    <div className="flex flex-col justify-start rounded-xl bg-white p-1 shadow-sm">
      <Image
        className="h-36 w-full rounded-lg object-cover object-bottom shadow-md transition-all duration-500 ease-in-out sm:h-48"
        src={product.image}
        width={1024}
        height={768}
        quality={100}
        alt={`${product.name} image`}
      />
      <div className="mt-2 flex h-full w-full flex-col justify-between px-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold tracking-tighter normal-case transition-all duration-500 ease-in-out first-letter:uppercase sm:text-2xl">
              {product.name}
            </h3>
            <p className="text-dark/60 text-sm tracking-tighter sm:text-lg">
              {truncatedDesc}
            </p>
          </div>
        </div>
        <div className="mt-5 mb-2 flex w-full items-center justify-between">
          <p className="font-unbounded text-xl font-bold transition-all duration-500 ease-in-out sm:text-2xl">
            {formatCurrency(product.price)}
          </p>
          <button
            type="button"
            onClick={() =>
              addItem({ id: product.id, name: product.name, qty: 1 })
            }
            className="bg-primary-red cursor-pointer place-items-end rounded-lg p-1 text-center sm:rounded-xl"
          >
            <PlusIcon className="text-light size-6 sm:size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
