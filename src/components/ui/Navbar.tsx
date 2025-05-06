import { useEffect, useState } from "react";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { useCart } from "@/contexts/CartContext";

import DelayedLink from "./DelayedLink";

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

        <DelayedLink href="/cart" className="cursor-pointer">
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
        </DelayedLink>
      </div>
    </header>
  );
};

export default Navbar;
