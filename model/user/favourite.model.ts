import mongoose from "mongoose";
import {IFavourite } from "../../interface/IFavourite";
const favouriteSchema = new mongoose.Schema<IFavourite>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
       
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "products",
        
    },
    isDelete: {
        type: Boolean,
        default: false,
      }
})
const favouriteCollection = mongoose.model<IFavourite>('favourites',favouriteSchema)
export default favouriteCollection