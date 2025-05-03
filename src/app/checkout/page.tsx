"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { checkoutSchema, CheckoutData } from "@/schemas/checkout";
import { buildWhatsAppLink } from "@/utils/whatsapp-message";
import { useCart } from "@/contexts/CartContext";

import EmptyCartLayout from "@/components/pages/EmptyCartLayout";
import CheckoutForm from "@/components/forms/CheckoutForm";

export default function CheckoutPage() {
  const { cart } = useCart();

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

  return (
    <CheckoutForm
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      paymentMethod={paymentMethod}
    />
  );
}
