import { motion, Variants } from "framer-motion";
import React from "react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { productList } from "@/data/products";

interface Props {
  onClose: () => void;
}

type MVariants = Variants;
const backdropVariants: MVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
const panelVariants: MVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "-125%" },
};

const PriceInfosSectionRightMobile = ({ onClose }: Props) => {
  const { cart } = useCart();

  return (
    <>
      <motion.div
        key="overlay"
        className="bg-opacity-50 bg-dark/30 fixed inset-0 z-50 backdrop-blur-md sm:hidden"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      <motion.div
        key="panel"
        className="fixed top-14 right-0 bottom-0 left-0 z-50 mx-auto max-h-max w-11/12 max-w-md rounded-xl bg-white p-2 shadow-md sm:hidden"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "tween", duration: 0.3 }}
      >
        <ul>
          {cart.map((item: CartItem) => {
            const product = productList.find((p) => p.id === item.id);
            if (!product) return null;

            const itemsFinalPrice = product.price * item.qty;

            return (
              <li key={item.id} className="border-dark/30 border-b py-2">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col items-start">
                    <h2 className="font-unbounded text-sm font-light">
                      {product.name}
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

        <div className="mt-3">
          <button
            className="bg-primary-red text-light w-full rounded-lg py-2"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default PriceInfosSectionRightMobile;
