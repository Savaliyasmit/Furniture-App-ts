import mongoose from "mongoose";
import {IOrder} from "../../interface/IOrder"
const orderSchema = new mongoose.Schema<IOrder>({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "users" 
  },
  items: [
      {
        cartItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
        }
      }],
  totalAmount: Number,
  status:{
   type:String,
   default:"pending",
   enum:["pending","dispatch","comleted","rejected"]
  },
    isDelete: {
      type: Boolean,
      default: false,
    }
  },
  {
      timestamps: true
  })

const orderCollection = mongoose.model<IOrder>('orders',orderSchema)
export default orderCollection