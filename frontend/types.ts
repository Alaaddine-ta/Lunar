export interface Product {
  id: number;
  category: Category;
  name: string;
  price: number;
  original_price: number ;
  isFeatured: boolean;
  size: Size;
  color: Color;
  image: Image[],
  quantity: number;
};

export interface Image {
  id: number;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: number;
  name: string;
  billboard: Billboard;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};
