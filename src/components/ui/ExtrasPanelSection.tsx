"use client";

import { motion, Variants } from "framer-motion";
import React, { useState } from "react";

import { ProductItem } from "@/data/products";
import { ALL_EXTRAS } from "@/data/extras";

interface ExtrasPanelProps {
  product: ProductItem;
  currentExtras: string[];
  onSave: (extras: string[]) => void;
  onClose: () => void;
}

export default function ExtrasPanel({
  product,
  currentExtras,
  onSave,
  onClose,
}: ExtrasPanelProps) {
  const [selected, setSelected] = useState<string[]>([...currentExtras]);

  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelected((sel) =>
      sel.includes(val) ? sel.filter((x) => x !== val) : [...sel, val],
    );
  };

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

  return (
    <>
      <motion.div
        key="overlay"
        className="bg-opacity-50 bg-dark/30 fixed inset-0 z-50 backdrop-blur-md"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      <motion.div
        key="panel"
        className="fixed top-20 right-0 bottom-0 left-0 z-50 mx-auto max-h-max w-11/12 max-w-md rounded-xl bg-white p-2 shadow-md"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", duration: 0.3 }}
      >
        <p className="mb-5 text-sm sm:text-base">
          Adicionais para:{" "}
          <span className="font-unbounded font-semibold underline sm:text-lg">
            {product.name}
          </span>
        </p>
        <div className="flex max-h-60 flex-col gap-2 overflow-y-auto">
          {ALL_EXTRAS.map((extra) => (
            <label key={extra.id} className="inline-flex items-center">
              <input
                type="checkbox"
                value={extra.name}
                checked={selected.includes(extra.name)}
                onChange={toggle}
                className="mr-2"
              />
              {extra.name}
            </label>
          ))}
        </div>
        <motion.button
          whileTap={{ scale: 1.1 }}
          onClick={() => onSave(selected)}
          className="bg-primary-blue mt-5 w-full cursor-pointer rounded-lg py-2 text-white"
        >
          Confirmar
        </motion.button>
      </motion.div>
    </>
  );
}
