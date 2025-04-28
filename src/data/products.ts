export interface ProductItem {
  id: number;
  name: string;
  price: number;
  isSweet: boolean;
}

export const productList: ProductItem[] = [
  { id: 1, name: "Pastel de Queijo", price: 8.5, isSweet: false },
  { id: 2, name: "Pastel de Carne", price: 9.0, isSweet: false },
  { id: 3, name: "Pastel de Chocolate", price: 7.5, isSweet: true },
  { id: 4, name: "Pastel de Banana com Canela", price: 8.0, isSweet: true },
  { id: 5, name: "Pastel de Nutella", price: 8.0, isSweet: true },
];
