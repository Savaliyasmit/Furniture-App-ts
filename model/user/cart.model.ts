import mongoose  from "mongoose";
import {ICart} from "../../interface/ICart"
const cartSchema = new mongoose.Schema<ICart>({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    cartItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    quantity:{
        require:true,
        type: Number,
        default: 1
    },
    totalAmount:Number,
    isDelete: {
        type: Boolean,
        default: false
    }

})
const cartCollection  = mongoose.model<ICart>('carts',cartSchema);
export default cartCollection