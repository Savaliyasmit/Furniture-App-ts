import mongoose from "mongoose"
import {IReview} from "../../interface/IReview"
const reviewSchema = new mongoose.Schema<IReview>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    review:{
        type:String
    },
      isDelete: {
        type: Boolean,
        default: false,
      }},
      {
        timestamps: true
      })
    const reviewCollection = mongoose.model<IReview>('reviews',reviewSchema);
    export default reviewCollection