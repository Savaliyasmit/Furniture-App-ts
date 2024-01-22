import mongoose from "mongoose";
export interface IReview {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  review: string;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
