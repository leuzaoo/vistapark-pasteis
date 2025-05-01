"use client";
import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useContext,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  qty: number;
  notes?: string;
  image: string;
  price: number;
}

type Action =
  | { type: "add"; item: CartItem }
  | { type: "remove"; id: number }
  | { type: "removeQty"; id: number; qty: number }
  | { type: "updateNotes"; id: number; notes: string };

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "add": {
      const exists = state.find((i) => i.id === action.item.id);
      if (exists) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: i.qty + action.item.qty, notes: i.notes }
            : i,
        );
      }
      return [...state, action.item];
    }
    case "removeQty": {
      return state
        .map((i) =>
          i.id === action.id
            ? { ...i, qty: Math.max(0, i.qty - action.qty) }
            : i,
        )
        .filter((i) => i.qty > 0);
    }
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "updateNotes":
      return state.map((i) =>
        i.id === action.id ? { ...i, notes: action.notes } : i,
      );
    default:
      return state;
  }
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeQty: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  updateNotes: (id: number, notes: string) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: CartItem) => dispatch({ type: "add", item });
  const removeQty = (id: number, qty: number) =>
    dispatch({ type: "removeQty", id, qty });
  const removeItem = (id: number) => dispatch({ type: "remove", id });
  const updateNotes = (id: number, notes: string) =>
    dispatch({ type: "updateNotes", id, notes });

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeQty, removeItem, updateNotes, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
