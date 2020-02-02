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

export const ProductsSortEnum = {
  recent: {
    value: 'recent',
    label: 'Most recent'
  },
  lowest: { 
    value: 'lowest', 
    label: 'Lowest price' 
  },
  highest: { 
    value: 'highest', 
    label: 'Highest price'
  }
}

export interface ProductRedeemResponse {
  message: string;
}