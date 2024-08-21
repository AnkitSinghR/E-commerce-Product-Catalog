export interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
}

export interface Category {
  title: string;
  value: string;
}
