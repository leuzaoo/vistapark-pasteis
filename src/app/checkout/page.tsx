"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { checkoutSchema, CheckoutData } from "@/schemas/checkout";
import { useCart, CartItem } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const { cart, updateNotes, removeItem } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

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
    setIsAnimating(true);

    const { tower, apartment, paymentMethod, cashAmount } = data;

    const mensagem = [
      "*Novo pedido de pastéis:*",
      ...cart.map(
        (i) => `${i.qty}x ${i.name}${i.notes ? ` (${i.notes})` : ""}`
      ),
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
    const link = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      mensagem
    )}`;

    setTimeout(() => {
      window.open(link, "_blank");
      setIsAnimating(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <p className="p-4">
        Seu carrinho está vazio. <Link href="/">Volte à lista de produtos</Link>
        .
      </p>
    );
  }

  return (
    <div className="relative max-w-lg mx-auto p-4 space-y-6">
      {/* Overlay de animação */}
      {isAnimating && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
          <p className="text-xl font-semibold">
            Finalize o pedido no Whatsapp...
          </p>
        </div>
      )}

      {/* Revisão do carrinho */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Meu Pedido</h2>
        {cart.map((item: CartItem) => (
          <div key={item.id} className="flex items-center mb-4">
            <div className="flex-1">
              <p>
                {item.qty}x {item.name}
              </p>
              <input
                type="text"
                placeholder="Observações (ex: sem cebola)"
                value={item.notes || ""}
                onChange={(e) => updateNotes(item.id, e.target.value)}
                className="border rounded px-2 py-1 w-full mt-1"
              />
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-2 text-red-500 hover:underline text-2xl leading-none"
              title="Remover"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Formulário de entrega */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Torre</label>
          <input
            {...register("tower")}
            className="w-full border rounded px-2 py-1"
          />
          {errors.tower && (
            <p className="text-red-600">{errors.tower.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Apartamento</label>
          <input
            {...register("apartment")}
            className="w-full border rounded px-2 py-1"
          />
          {errors.apartment && (
            <p className="text-red-600">{errors.apartment.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Forma de pagamento</label>
          <select
            {...register("paymentMethod")}
            className="w-full border rounded px-2 py-1"
          >
            <option value="Cartão">Cartão</option>
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-600">{errors.paymentMethod.message}</p>
          )}
        </div>

        {paymentMethod === "Dinheiro" && (
          <div>
            <label className="block font-medium">Valor em dinheiro (R$)</label>
            <input
              {...register("cashAmount")}
              className="w-full border rounded px-2 py-1"
            />
            {errors.cashAmount && (
              <p className="text-red-600">{errors.cashAmount.message}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Enviar para WhatsApp
        </button>
      </form>
    </div>
  );
}
