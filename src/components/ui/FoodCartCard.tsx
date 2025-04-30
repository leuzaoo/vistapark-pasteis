import Image from "next/image";
import React from "react";

import { ProductItemCartProps } from "@/data/products";

interface Props {
  product: ProductItemCartProps;
  updatedNotes: () => void;
}

export default function FoodCartCard({ product, updatedNotes }: Props) {
  return (
    <>
      <div>{product.name}</div>
      {/* todo: alterar para imagem verdadeira do produto */}
      <Image
        src="/pastel-calabresa.avif"
        alt={`${product.name} image`}
        width={1024}
        height={768}
        quality={100}
      />
      <div>{product.price}</div>
      <div>{product.qty}</div>
      <input
        type="text"
        placeholder="Observações (ex: sem cebola)"
        value={product.notes || ""}
        onChange={updatedNotes}
        className="mt-1 w-full rounded border px-2 py-1"
      />
    </>
  );
}
