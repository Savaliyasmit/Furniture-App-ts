import orderCollection from "../../model/user/order.model";
import cartCollection from "../../model/user/cart.model";
import { ICart } from "../../interface/ICart";
import { IOrder } from "../../interface/IOrder";

export class OrderService {
  getAllOrder = async (body: any) => {
    return await orderCollection.find<IOrder>(body);
  };
  addOrder = async (body: any) => {
    return await orderCollection.create<IOrder>(body);
  };
  findCart = async (body: any) => {
    return await cartCollection.find<ICart>(body).populate("cartItem");
  };
  getOrder = async (id: any) => {
    return await orderCollection.findOne<IOrder>(id).populate({path: "items",populate: 
    { path: "cartItem", model: "products" }
  });
  };
  updateOrder = async (id: any, body: any) => {
    return await orderCollection.findOneAndUpdate(id, body);
  };
}
