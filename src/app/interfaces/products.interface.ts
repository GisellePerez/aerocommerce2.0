export interface Product {
  _id: string,
  name: string,
  cost: number,
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