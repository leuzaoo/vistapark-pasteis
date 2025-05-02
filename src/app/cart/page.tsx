"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ListOrderedIcon } from "lucide-react";

import { useCart, CartItem } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import PriceInfosSectionRightMobile from "@/components/ui/PriceInfosSectionRightMobile";
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
          <ListOrderedIcon
            strokeWidth={1.5}
            size={32}
            className="mb-5"
            onClick={() => setOpenMenuCard(true)}
          />
        </div>

        <div className="flex-1 overflow-hidden sm:grid sm:grid-cols-2 sm:gap-5">
          <div className="h-full overflow-y-auto pr-3 pb-40 sm:pb-0">
            {cart.map((item: CartItem) => {
              const product = productList.find((p) => p.id === item.id);
              if (!product) return null;

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
              <PriceInfosSectionRightMobile
                onClose={() => setOpenMenuCard(false)}
              />
            )}
          </AnimatePresence>

          <div className="block sm:hidden">
            <PriceInfosSection />
          </div>
        </div>
      </div>
    </>
  );
}
