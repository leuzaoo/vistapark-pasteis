import { calculateTotalPrice } from "./totalPrice";
import { CartItem } from "@/contexts/CartContext";
import { CheckoutData } from "@/schemas/checkout";
import { formatCurrency } from "./formatCurrency";
import { productList } from "@/data/products";

const DEFAULT_WHATSAPP_PHONE = "5511940361039";

export function buildWhatsAppLink(
  cartItems: CartItem[],
  data: CheckoutData,
  phone: string = DEFAULT_WHATSAPP_PHONE,
): string {
  const { tower, apartment, paymentMethod, cashAmount } = data;

  const lines = cartItems.map((i) => {
    const extrasStr =
      i.extras && i.extras.length
        ? ` (*Adicional:* ${i.extras.join(", ")})`
        : "";
    const notesStr = i.notes ? ` (*Obs:* ${i.notes})` : "";
    return `• ${i.qty}x ${i.name}${extrasStr}${notesStr}`;
  });

  const totalPrice = calculateTotalPrice(cartItems, productList);

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const message = [
    "*Novo pedido de pastéis:*",
    ...lines,
    "",
    "*Pagamento:*",
    paymentMethod,
    paymentMethod === "Dinheiro" ? `(vai pagar R$ ${cashAmount})` : "",
    "",
    `*Entrega:* Torre ${tower}, Apto ${apartment}`,
    "",
    `*Quantidade total:* ${totalItems} ${totalItems <= 1 ? "pastel" : "pastéis"}`,
    "",
    `*Valor do Pedido:* ${formatCurrency(totalPrice)}`,
  ]
    .filter(Boolean)
    .join("\n");

  console.log(message);

  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message,
  )}`;
}
