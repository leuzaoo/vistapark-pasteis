import Link from "next/link";
import React from "react";

import HeaderCart from "../ui/HeaderCart";

const EmptyCartLayout = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-b-2xl bg-white p-8 shadow-sm">
      <HeaderCart />
      <p className="font-light transition-all duration-500 ease-in-out sm:text-xl">
        Não há pastéis em seu carrinho. Volte ao menu e adicione.
      </p>
      <Link
        href="/menu"
        className="bg-primary-yellow text-dark max-w-max rounded-2xl px-4 py-2 text-xl font-semibold transition-all duration-200 ease-in-out hover:opacity-80 sm:text-2xl"
      >
        Voltar
      </Link>
    </div>
  );
};

export default EmptyCartLayout;
