export interface ProductItem {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  isSweet: boolean;
}

export const productList: ProductItem[] = [
  {
    id: 0,
    name: "Frango e catupiry",
    desc: "Frango, catupiry, milho e coentro.",
    image: "/pastel-calabresa.avif",
    price: 2400,
    isSweet: false,
  },
  {
    id: 1,
    name: "Queijo",
    desc: "Queijo, catupiry",
    image: "/pastel-calabresa.avif",
    price: 8000,
    isSweet: false,
  },
  {
    id: 2,
    name: "Carne",
    desc: "Carne moída, queijo, azeitona, calabresa, catupiry",
    image: "/pastel-calabresa.avif",
    price: 2000,
    isSweet: false,
  },
  {
    id: 3,
    name: "Chocolate",
    image: "/pastel-calabresa.avif",
    desc: "Chocolate",
    price: 2100,
    isSweet: true,
  },
  {
    id: 4,
    name: "Banana com canela",
    desc: "Banana, canela e doce de leite",
    image: "/pastel-calabresa.avif",
    price: 2100,
    isSweet: true,
  },
  {
    id: 5,
    name: "Nutella",
    desc: "Chocolate nutella",
    image: "/pastel-calabresa.avif",
    price: 2400,
    isSweet: true,
  },
];
