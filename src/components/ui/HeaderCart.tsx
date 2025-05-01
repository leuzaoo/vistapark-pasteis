import React from "react";

import { useCart } from "@/contexts/CartContext";

import TitlePage from "./TitlePage";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

interface Props {
  href: string;
}

const HeaderCart = ({ href }: Props) => {
  const { totalItems } = useCart();

  return (
    <div className="flex items-center gap-2 pb-5">
      <Link href={href}>
        <ChevronLeftIcon />
      </Link>
      <TitlePage text="Carrinho" />
      <span className="text-primary-red text-xl transition-all duration-500 ease-in-out sm:text-2xl">
        ({totalItems})
      </span>
    </div>
  );
};

export default HeaderCart;
