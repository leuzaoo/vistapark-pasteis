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
import InputField from "./InputField";

interface CheckoutFormProps {
  handleSubmit: UseFormHandleSubmit<CheckoutData>;
  register: UseFormRegister<CheckoutData>;
  onSubmit: (data: CheckoutData) => void;
  watch: UseFormWatch<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="justify-between space-y-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <InputField
          label="Torre"
          name="tower"
          placeholder="Ex: 5"
          register={register}
          errors={errors}
        />

        <InputField
          label="Apartamento"
          name="apartment"
          placeholder="Ex: 106"
          register={register}
          errors={errors}
        />

        <InputField
          label="Forma de pagamento"
          name="paymentMethod"
          register={register}
          errors={errors}
          options={[
            // { value: "", label: "Selecionar" },s
            { value: "Cartão", label: "Cartão" },
            { value: "Pix", label: "Pix" },
            { value: "Dinheiro", label: "Dinheiro" },
          ]}
        />

        {paymentMethod === "Dinheiro" && (
          <InputField
            label="Valor em dinheiro (R$)"
            name="cashAmount"
            placeholder="Ex: R$75"
            register={register}
            errors={errors}
          />
        )}
      </div>

      <motion.button
        whileTap={{ scale: 1.05 }}
        type="submit"
        disabled={!isFormValid}
        className={`mt-7 w-full rounded-lg py-3 text-xl font-medium text-white transition-all duration-200 ease-in-out ${isFormValid ? "cursor-pointer bg-green-600 hover:bg-green-800" : "cursor-not-allowed bg-gray-400"} `}
      >
        Finalizar pedido
      </motion.button>
    </form>
  );
}
