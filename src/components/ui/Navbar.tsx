import React, { useEffect, useState } from "react";
import { ShoppingBasketIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

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
              {mounted && totalItems > 0 && (
                <div className="bg-primary-yellow absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold">
                  {totalItems}
                </div>
              )}
            </div>
          </Link>
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
