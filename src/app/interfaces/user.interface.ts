export interface UserData {
  _id: number;
  name: string;
  points: number;
  __v: any; // @TODO: type this
  redeemHistory: any; // @TODO: type this
  createDate: string;
}

export interface updatedPointsResponse {
  message: string;
 'New Points': number;
}