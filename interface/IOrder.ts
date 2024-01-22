import mongoose from "mongoose";

interface cartItem {
  cartItem: mongoose.Schema.Types.ObjectId;
  quantity: number;
}
export interface IOrder {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  items: cartItem[];
  status: "pending" | "dispatch" | "comleted" | "rejected";
  totalAmount: Number;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
