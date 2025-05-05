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
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 2400,
    isSweet: false,
  },
  {
    id: 1,
    name: "Queijo",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 8000,
    isSweet: false,
  },
  {
    id: 2,
    name: "Carne",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 2000,
    isSweet: false,
  },
  {
    id: 3,
    name: "Chocolate",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 2100,
    isSweet: true,
  },
  {
    id: 4,
    name: "Banana com canela",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 2100,
    isSweet: true,
  },
  {
    id: 5,
    name: "Nutella",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, illum!",
    image: "/pastel-calabresa.avif",
    price: 2400,
    isSweet: true,
  },
];
