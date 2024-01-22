import mongoose from "mongoose";
export interface IFavourite {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
