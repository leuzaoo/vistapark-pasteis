"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormWatch,
} from "react-hook-form";

import { CheckoutData } from "@/schemas/checkout";

interface CheckoutFormProps {
  register: UseFormRegister<CheckoutData>;
  watch: UseFormWatch<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
  handleSubmit: UseFormHandleSubmit<CheckoutData>;
  onSubmit: (data: CheckoutData) => void;
  paymentMethod: string;
}

export default function CheckoutForm({
  register,
  watch,
  errors,
  handleSubmit,
  onSubmit,
  paymentMethod,
}: CheckoutFormProps) {
  const tower = watch("tower");
  const apartment = watch("apartment");
  const cashAmount = watch("cashAmount");

  const isFormValid =
    Boolean(tower && apartment && paymentMethod) &&
    (paymentMethod !== "Dinheiro" || Boolean(cashAmount));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Torre</label>
        <input
          {...register("tower")}
          className="w-full rounded border px-2 py-1"
        />
        {errors.tower && <p className="text-red-600">{errors.tower.message}</p>}
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
          <label className="block font-medium">Valor em dinheiro (R$)</label>
          <input
            {...register("cashAmount")}
            className="w-full rounded border px-2 py-1"
          />
          {errors.cashAmount && (
            <p className="text-red-600">{errors.cashAmount.message}</p>
          )}
        </div>
      )}

      <motion.button
        whileTap={{ scale: 1.05 }}
        type="submit"
        disabled={!isFormValid}
        className={`w-full rounded px-4 py-2 text-white transition-all duration-200 ease-in-out ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "cursor-not-allowed bg-gray-400"} `}
      >
        Enviar para WhatsApp
      </motion.button>
    </form>
  );
}
