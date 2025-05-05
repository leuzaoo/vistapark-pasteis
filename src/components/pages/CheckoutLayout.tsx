"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { checkoutSchema, CheckoutData } from "@/schemas/checkout";
import { buildWhatsAppLink } from "@/utils/whatsapp-message";
import { calculateTotalPrice } from "@/utils/totalPrice";
import { formatCurrency } from "@/utils/formatCurrency";
import { useCart } from "@/contexts/CartContext";
import { productList } from "@/data/products";

import EmptyCartLayout from "@/components/pages/EmptyCartLayout";
import CheckoutForm from "@/components/forms/CheckoutForm";
import TitlePage from "../ui/TitlePage";

const CheckoutLayout = () => {
  const { cart, totalItems } = useCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutData>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: CheckoutData) => {
    if (cart.length === 0) return;

    const url = buildWhatsAppLink(cart, data);
    window.open(url, "_blank");
  };

  if (cart.length === 0) {
    return <EmptyCartLayout />;
  }

  const totalPrice = calculateTotalPrice(cart, productList);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="flex items-center gap-2 pb-5">
        <Link href="/cart">
          <ChevronLeftIcon />
        </Link>
        <TitlePage text="Checkout" />
      </div>
      <CheckoutForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        paymentMethod={paymentMethod}
        watch={watch}
      />
      <div className="border-dark/15 mt-7 flex w-full items-center justify-between rounded-lg border bg-white p-2 shadow-sm">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full justify-between">
            Quantidade
            <span className="font-unbounded font-bold">x{totalItems}</span>
          </div>
          <div className="flex w-full justify-between">
            Valor total
            <span className="font-unbounded font-bold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
