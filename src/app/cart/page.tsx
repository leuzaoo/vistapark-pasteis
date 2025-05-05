"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { ListOrderedIcon } from "lucide-react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import PriceInfosSectionMobile from "@/components/ui/PriceInfosSectionMobile";
import PriceInfosSectionRight from "@/components/ui/PriceInfosSectionRight";
import PriceInfosSection from "@/components/ui/PriceInfosSection";
import EmptyCartLayout from "@/components/pages/EmptyCartLayout";
import ExtrasPanel from "@/components/ui/ExtrasPanelSection";
import FoodCartCard from "@/components/ui/FoodCartCard";
import HeaderCart from "@/components/ui/HeaderCart";

export default function CartPage() {
  const { cart, addItem, removeQty, updateNotes, removeItem, updateExtras } =
    useCart();

  const [itemForExtras, setItemForExtras] = useState<CartItem | null>(null);
  const [openMenuCard, setOpenMenuCard] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSaveExtras = (extras: string[]) => {
    if (itemForExtras) {
      updateExtras(itemForExtras.id, extras);
      setItemForExtras(null);
    }
  };

  const savoryItems = cart.filter((item) => {
    const p = productList.find((p) => p.id === item.id);
    return p?.isSweet === false;
  });

  const sweetItems = cart.filter((item) => {
    const p = productList.find((p) => p.id === item.id);
    return p?.isSweet === true;
  });

  if (!mounted) {
    return null;
  }

  if (cart.length === 0) {
    return <EmptyCartLayout />;
  }

  return (
    <>
      <div className="relative mx-auto flex h-screen max-w-4xl flex-col px-4 py-4">
        <div className="flex w-full items-center justify-between">
          <HeaderCart href="/menu" />
          <motion.button whileTap={{ scale: 1.2 }}>
            <ListOrderedIcon
              strokeWidth={1.5}
              size={32}
              className="mb-5 sm:hidden"
              onClick={() => setOpenMenuCard(true)}
            />
          </motion.button>
        </div>

        <div className="flex-1 overflow-hidden sm:grid sm:grid-cols-2 sm:gap-5">
          <div className="h-full overflow-y-auto pr-3 pb-40 sm:pb-0">
            {savoryItems.map((item) => {
              const product = productList.find((p) => p.id === item.id)!;
              return (
                <div key={item.id}>
                  <FoodCartCard
                    item={item}
                    product={product}
                    length={item.qty}
                    onAdd={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        qty: 1,
                        image: item.image,
                        price: item.price,
                      })
                    }
                    onDecrease={() => removeQty(item.id, 1)}
                    onDeleteItem={() => removeItem(item.id)}
                    onUpdateNotes={(notes) => updateNotes(item.id, notes)}
                    onEditExtras={() => setItemForExtras(item)}
                  />
                </div>
              );
            })}

            {sweetItems.map((item) => {
              const product = productList.find((p) => p.id === item.id)!;
              return (
                <div key={item.id}>
                  <FoodCartCard
                    item={item}
                    product={product}
                    length={item.qty}
                    onAdd={() =>
                      addItem({
                        id: item.id,
                        name: item.name,
                        qty: 1,
                        image: item.image,
                        price: item.price,
                      })
                    }
                    onDecrease={() => removeQty(item.id, 1)}
                    onDeleteItem={() => removeItem(item.id)}
                    onUpdateNotes={(notes) => updateNotes(item.id, notes)}
                    onEditExtras={() => setItemForExtras(item)}
                  />
                </div>
              );
            })}

            <AnimatePresence mode="wait">
              {itemForExtras && (
                <ExtrasPanel
                  product={productList.find((p) => p.id === itemForExtras.id)!}
                  currentExtras={itemForExtras.extras || []}
                  onSave={onSaveExtras}
                  onClose={() => setItemForExtras(null)}
                />
              )}
            </AnimatePresence>
          </div>

          <PriceInfosSectionRight />

          <AnimatePresence mode="wait">
            {openMenuCard && (
              <PriceInfosSectionMobile onClose={() => setOpenMenuCard(false)} />
            )}
          </AnimatePresence>

          <div className="block sm:hidden">
            <AnimatePresence mode="wait">
              <PriceInfosSection />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
