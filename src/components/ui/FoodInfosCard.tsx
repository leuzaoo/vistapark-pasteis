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
            <header className="flex items-center justify-between">
              <h2 className="font-unbounded text-2xl font-bold">
                {product.name}
              </h2>
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
                <button
                  onClick={decrease}
                  disabled={isZero}
                  className={`bg-dark/15 cursor-pointer rounded-l-2xl p-3 transition-all duration-500 ease-in-out ${isZero ? "opacity-30" : "hover:bg-dark/30"}`}
                >
                  <MinusIcon size={20} />
                </button>
                <span className="bg-dark/5 px-4 py-2 text-lg font-medium">
                  {quantity}
                </span>
                <button
                  onClick={increase}
                  className="bg-dark/15 hover:bg-dark/30 cursor-pointer rounded-r-full p-3 transition-all duration-500 ease-in-out"
                >
                  <PlusIcon size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={onAddToCart}
              className={`w-full cursor-pointer rounded-full py-3 text-center font-semibold text-white ${actionClasses}`}
            >
              {actionLabel}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
