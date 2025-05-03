import { CartItem } from "@/contexts/CartContext";
import { ProductItem } from "@/data/products";

/**
 *
 * @param cartItems
 * @param products
 * @returns
 */

export function calculateTotalPrice(
  cartItems: CartItem[],
  products: ProductItem[],
): number {
  return cartItems.reduce((sum, item) => {
    const prod = products.find((p) => p.id === item.id);
    if (!prod) return sum;
    return sum + prod.price * item.qty;
  }, 0);
}
