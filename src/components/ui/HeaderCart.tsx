import React from "react";

import { useCart } from "@/contexts/CartContext";

import TitlePage from "./TitlePage";

const HeaderCart = () => {
  const { totalItems } = useCart();

  return (
    <div className="flex items-center gap-2">
      <TitlePage text="Carrinho" />
      <span className="text-primary-red transition-all duration-500 ease-in-out sm:text-2xl">
        ({totalItems})
      </span>
    </div>
  );
};

export default HeaderCart;
