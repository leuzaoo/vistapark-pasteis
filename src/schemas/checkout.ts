import { z } from "zod";

export const checkoutSchema = z
  .object({
    tower: z.string().min(1, "Deve ser preenchido."),
    apartment: z.string().min(1, "Deve ser preenchido."),
    paymentMethod: z.enum(["Cartão", "Pix", "Dinheiro"]),
    cashAmount: z.string().optional(),
  })
  .refine(
    (data) => data.paymentMethod !== "Dinheiro" || !!data.cashAmount?.trim(),
    {
      path: ["cashAmount"],
      message: "Informe o valor do dinheiro para te levarmos o troco.",
    },
  );

export type CheckoutData = z.infer<typeof checkoutSchema>;
