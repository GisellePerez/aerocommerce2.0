export interface Product {
  _id: string,
  name: string,
  const: number,
  category: string,
  img: ProductImg;
}

export interface ProductImg {
  url: string;
  hdUrl: string;
}

export enum ProductsSortEnum {
  recent = 'recent',
  lowest = 'lowest',
  highest = 'highest'
}