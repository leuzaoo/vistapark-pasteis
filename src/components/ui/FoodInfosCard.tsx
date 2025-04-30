"use client";

import React, { useCallback } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ProductItem } from "@/data/products";
import { PlusIcon, MinusIcon, X as CloseIcon } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

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
  const actionClasses = isZero
    ? "bg-red-600 hover:bg-red-700"
    : "bg-primary-red hover:bg-primary-red-dark";

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="fixed right-0 bottom-0 left-0 z-50 mx-auto w-full max-w-md rounded-t-[30px] bg-white p-6 shadow-xl"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
          >
            <header className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button onClick={onClose} className="p-1">
                <CloseIcon size={20} />
              </button>
            </header>

            <p className="mb-6 text-gray-700">{product.desc}</p>

            <div className="mb-6 flex justify-between space-x-4">
              <div>
                <p className="text-sm text-gray-500">Valor unitário</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(unitPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor total</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalPrice)}
                </p>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-center space-x-4">
              <button
                onClick={decrease}
                disabled={isZero}
                className={`rounded-full bg-gray-200 p-2 ${isZero ? "opacity-30" : "hover:bg-gray-300"}`}
              >
                <MinusIcon size={16} />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={increase}
                className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
              >
                <PlusIcon size={16} />
              </button>
            </div>

            <button
              onClick={onAddToCart}
              className={`w-full rounded-full py-3 text-center font-semibold text-white ${actionClasses}`}
            >
              {actionLabel}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
