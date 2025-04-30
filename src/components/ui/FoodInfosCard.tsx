"use client";

import React, { useCallback } from "react";

import { motion, Variants } from "framer-motion";
import { X as CloseIcon } from "lucide-react";

import { formatCurrency } from "@/utils/formatCurrency";
import { ProductItem } from "@/data/products";

import AddRemoveButton from "./AddRemoveButton";

interface FoodInfosCardProps {
  product: ProductItem;
  isOpen: boolean;
  quantity: number;
  onClose: () => void;
  onQuantityChange: (newQty: number) => void;
  onAddToCart: () => void;
}

type MVariants = Variants;
const backdropVariants: MVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const panelVariants: MVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

export default function FoodInfosCard({
  product,
  isOpen,
  quantity,
  onClose,
  onQuantityChange,
  onAddToCart,
}: FoodInfosCardProps) {
  const decrease = useCallback(() => {
    if (quantity > 0) onQuantityChange(quantity - 1);
  }, [quantity, onQuantityChange]);

  const increase = useCallback(() => {
    onQuantityChange(quantity + 1);
  }, [quantity, onQuantityChange]);

  const isZero = quantity === 0;
  const unitPrice = product.price;
  const totalPrice = unitPrice * quantity;

  const actionLabel = isZero ? "Remover do carrinho" : "Atualizar carrinho";

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        className="bg-opacity-50 fixed inset-0 z-40 backdrop-blur-lg"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      <motion.div
        className="fixed right-0 bottom-0 left-0 z-50 mx-auto w-full max-w-3xl rounded-t-xl bg-white p-6 shadow-xl"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "tween", duration: 0.3 }}
      >
        <header className="flex items-center justify-between">
          <h2 className="font-unbounded text-2xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="bg-primary-red/20 cursor-pointer rounded-full p-1"
          >
            <CloseIcon size={20} />
          </button>
        </header>

        <p className="text-dark/60 mb-16 text-xl">{product.desc}</p>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-dark text-xl">Valor total</p>
            <p className="font-unbounded text-2xl font-bold">
              {formatCurrency(totalPrice)}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <AddRemoveButton
              increase={increase}
              decrease={decrease}
              disabled={isZero}
              isZero={isZero}
              quantity={quantity}
            />
          </div>
        </div>

        <button
          onClick={onAddToCart}
          className="bg-primary-red hover:bg-primary-red/60 w-full cursor-pointer rounded-full py-3 text-center font-semibold text-white transition-all duration-200 ease-in-out"
        >
          {actionLabel}
        </button>
      </motion.div>
    </>
  );
}
