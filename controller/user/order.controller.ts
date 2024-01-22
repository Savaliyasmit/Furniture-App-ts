import { Request,Response } from "express";
import cartCollection from "../../model/user/cart.model";
import  {OrderService}  from "../../services/user/order.services"
const orderService = new OrderService()

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }
  
// localhost:5000/api/v1/users/order/add-order
export const addOrder = async (req:Request, res:Response) => {
    try {
      const cartItems:null |undefined|object|any = await orderService.findCart({user: req.user._id,isDelete: false })
      console.log(cartItems);
      
      if (!cartItems || cartItems.length === 0) {
        return res.json({ message: "No items found in the cart" });
      }
      let orderItems = cartItems.map((e:any) => ({
        cartItem: e.cartItem,
        quantity: e.quantity,
        price: e.cartItem.price
      }));
      let totalPrice:number = orderItems.reduce((total:number|null|any, item:number|null|any) => total + item.quantity * item.price, 0);
      
       let order = await orderService.addOrder({
        user: req.user.id,
        items: orderItems,
        totalAmount: totalPrice
      });
  
      await cartCollection.updateMany({ user: req.user._id }, { isDelete: true });
      res.json({order,message: "Order palced" });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };

//  localhost:5000/api/v1/users/order/get-order/:id
   export const getOrder = async (req:Request,res:Response)=>{
    try {
      let spacificOrder = await orderService.getOrder({_id:req.params.id,isDelete:false})
      if(!spacificOrder){
          return res.json({message:"order not found"})
      } 
      res.json({spacificOrder,message:"your order"})
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  }

  
//  localhost:5000/api/v1/users/order/my-order
export const getAllOrder = async (req:Request, res:Response) => {
    try {
      let order:undefined|null|any = await orderService.getAllOrder({ user: req.user._id, isDelete: false });
      if (!order || order.length === 0) {
        return res.json({ message: "your order was empty" });
      }
      res.json({ order,massage: "all orders found"});
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  }; 

  export const cancelOrder = async (req:Request, res:Response) => {
    try {
    
      let removeOrder =  await orderService.updateOrder({_id:req.params.id,isDelete:false},{isDelete:true})
      if (!removeOrder) {
        return res.json({ message: "order not found.." });
      }
      res.json({ message: "cancel order sucessfully..." });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };