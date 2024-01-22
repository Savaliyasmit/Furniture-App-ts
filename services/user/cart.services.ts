import cartCollection from "../../model/user/cart.model";
import { ICart } from "../../interface/ICart";

export default class CartService {
  getCart = async (body: any) => {
    return await cartCollection.findOne<ICart>(body);
  };
  addCart = async (body: any) => {
    return await cartCollection.create<ICart>(body);
  };
  getAllCarts = async (data: any) => {
    return await cartCollection.find<ICart>(data).populate("cartItem");
  };
  getspacificCarts = async (data: any) => {
    return await cartCollection.findOne<ICart>(data).populate("cartItem");
  };
  updateCart = async (id: any, body: any) => {
    return await cartCollection.findOneAndUpdate<ICart>(id, body, {new: true});
  };
  removeCart = async (id: any) => {
    return await cartCollection.findOneAndDelete<ICart>(id);
  };
}
