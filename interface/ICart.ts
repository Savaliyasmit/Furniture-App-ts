import mongoose from "mongoose";
export interface ICart {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  cartItem: mongoose.Schema.Types.ObjectId;
  quantity: Number;
  totalAmount: Number;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
