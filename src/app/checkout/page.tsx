"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import { checkoutSchema, CheckoutData } from "@/schemas/checkout";
import { useCart, CartItem } from "@/contexts/CartContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { productList } from "@/data/products";

import AddRemoveButton from "@/components/ui/AddRemoveButton";
import TitlePage from "@/components/ui/TitlePage";

export default function CheckoutPage() {
  const { cart, updateNotes, addItem, removeQty, totalItems } = useCart();

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

    const message = [
      "*Novo pedido de pastéis:*",
      ...cart.map(
        (i) => `${i.qty}x ${i.name}${i.notes ? ` (${i.notes})` : ""}`,
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
      message,
    )}`;

    window.open(link, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-b-2xl bg-white p-8 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex">
            <TitlePage text="Carrinho" />
          </div>
          <span className="text-primary-red transition-all duration-500 ease-in-out sm:text-2xl">
            ({totalItems})
          </span>
        </div>
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
  }

  return (
    <>
      <div className="mx-auto max-w-lg space-y-6 p-4">
        <div>
          <div className="flex items-center gap-2">
            <TitlePage text="Carrinho" />
            <span className="text-primary-red transition-all duration-500 ease-in-out sm:text-2xl">
              ({totalItems})
            </span>
          </div>
          {cart.map((item: CartItem) => {
            const product = productList.find((p) => p.id === item.id);
            if (!product) return null;

            const totalPrice = item.price * item.qty;

            return (
              <>
                <div key={item.id} className="relative">
                  <div className="relative z-50 mt-5 mb-14 flex w-full items-center gap-2 rounded-3xl bg-white shadow-sm">
                    <div className="ml-2 size-20 py-2">
                      <Image
                        src={product.image}
                        width={1024}
                        height={768}
                        quality={100}
                        alt={`${product.name} image`}
                        className="size-16 rounded-2xl shadow-md"
                      />
                    </div>
                    <div className="w-full flex-col justify-between gap-5 pl-1">
                      <div className="flex w-full justify-between">
                        <p>{product.name}</p>
                      </div>
                      <div className="flex w-full items-end justify-between pr-3">
                        <span className="text-xl font-semibold">
                          {formatCurrency(totalPrice)}
                        </span>
                        <AddRemoveButton
                          decrease={() => removeQty(item.id, 1)}
                          increase={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              qty: 1,
                              image: "",
                              price: 0,
                            })
                          }
                          quantity={item.qty}
                          disabled={item.qty === 0}
                          isZero={item.qty === 0}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-primary-yellow/25 absolute -bottom-9 z-10 w-full rounded-b-3xl px-4 py-2 pt-6 shadow-sm">
                    <input
                      type="text"
                      placeholder="Observações (ex: Remover cebola)"
                      value={item.notes || ""}
                      onChange={(e) => updateNotes(item.id, e.target.value)}
                      className="text-dark border-dark/20 placeholder-dark/40 w-full border-b bg-transparent placeholder:text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Torre</label>
            <input
              {...register("tower")}
              className="w-full rounded border px-2 py-1"
            />
            {errors.tower && (
              <p className="text-red-600">{errors.tower.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Apartamento</label>
            <input
              {...register("apartment")}
              className="w-full rounded border px-2 py-1"
            />
            {errors.apartment && (
              <p className="text-red-600">{errors.apartment.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Forma de pagamento</label>
            <select
              {...register("paymentMethod")}
              className="w-full rounded border px-2 py-1"
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
              <label className="block font-medium">
                Valor em dinheiro (R$)
              </label>
              <input
                {...register("cashAmount")}
                className="w-full rounded border px-2 py-1"
              />
              {errors.cashAmount && (
                <p className="text-red-600">{errors.cashAmount.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Enviar para WhatsApp
          </button>
        </form>
      </div>
    </>
  );
}
