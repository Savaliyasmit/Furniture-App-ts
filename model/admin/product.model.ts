import mongoose from "mongoose";
import { IProduct} from "../../interface/IProduct"

const productSchema = new mongoose.Schema<IProduct>({
    productImage:
      {
        type: String,
      },
    title: {
      type: String,
      require: true,
      unique: true
    },
    description: {
      type: String,
      require: true
    },
    category: {
      type: String,
      require: true,
      enum: ["chair", "table", "armchair", "bed"]
    },
    price: {
      type: Number,
      require: true,
    },
    spacialCategory:{
      type:String,
      enum:["popular"]
    },
    isDelete: {
      type: Boolean,
      default: false,
    }
  },{timestamps:true});
const productCollection = mongoose.model<IProduct>('products',productSchema)
export default productCollection