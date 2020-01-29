export interface UserData {
  _id: number;
  name: string;
  points: number;
  __v: number;
  redeemHistory: RedeemHistory[];
  createDate: string;
}

export interface updatedPointsResponse {
  message: string;
 'New Points': number;
}

export interface RedeemHistory {
  productId: string;
  name: string;
  cost: number;
  category: string;
  _id: string;
  createDate: string;
}