import { UseFormRegister, FieldErrors, Path } from "react-hook-form";
import React from "react";

import { CheckoutData } from "@/schemas/checkout";

interface Option {
  value: string;
  label: string;
}

interface InputFieldProps {
  label: string;
  name: Path<CheckoutData>;
  register: UseFormRegister<CheckoutData>;
  errors: FieldErrors<CheckoutData>;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  options?: Option[];
}

const InputField = ({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  options,
}: InputFieldProps) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div>
      <label className="mb-1 block font-light">{label}</label>
      {options ? (
        <select
          {...register(name)}
          defaultValue=""
          className="border-dark/20 h-10 w-full rounded-lg border bg-white pl-2"
        >
          <option value="" disabled hidden>
            Ver opções
          </option>

          {options.map((opt) => (
            <option
              className="border-primary-red border-4"
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-black/20 bg-white pl-2"
        />
      )}

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
