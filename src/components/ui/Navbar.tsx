import { ShoppingBasketIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="bg-light sticky top-0 z-50 w-full shadow-sm">
      <div className="mx-auto flex w-full max-w-3xl justify-between p-3">
        <div>
          <Image
            src="/pastel-icon.svg"
            width={60}
            height={60}
            quality={100}
            alt="Logo"
          />
        </div>
        <motion.button whileTap={{ scale: 1.1 }}>
          <Link href="/cart">
            <div className="relative">
              <ShoppingBasketIcon
                className="text-primary-red"
                size={48}
                strokeWidth={1}
              />
              <div className="bg-primary-yellow absolute bottom-0 left-0 flex size-6 items-center justify-center rounded-full text-sm font-bold">
                {totalItems}
              </div>
            </div>
          </Link>
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
