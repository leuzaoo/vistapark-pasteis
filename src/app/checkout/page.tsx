"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { checkoutSchema, CheckoutData } from "@/schemas/checkout";
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
    const { tower, apartment, paymentMethod, cashAmount } = data;

    const lines = cart.map((i) => {
      const extrasStr =
        i.extras && i.extras.length
          ? ` (*Adicionais:* ${i.extras.join(", ")})`
          : "";

      const notesStr = i.notes ? ` (*Obs:* ${i.notes})` : "";

      return `• ${i.qty}x ${i.name}${extrasStr}${notesStr}`;
    });

    const message = [
      "*Novo pedido de pastéis:*",
      ...lines,
      "",
      "*Pagamento:*",
      paymentMethod,
      paymentMethod === "Dinheiro" ? `(vai pagar R$ ${cashAmount})` : "",
      "",
      `*Entrega:* Torre ${tower}, Apto ${apartment}`,
    ]
      .filter(Boolean)
      .join("\n");

    const phone = "5511940361039";
    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
        message,
      )}`,
      "_blank",
    );
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
