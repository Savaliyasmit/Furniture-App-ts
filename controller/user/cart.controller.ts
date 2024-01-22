import { Request,Response } from "express";
import CartService from "../../services/user/cart.services";
const cartService = new CartService()

declare global{
  namespace Express{
    interface Request{
      user?:any;
    }
  }
}

// localhost:5000/api/v1/users/cart/add-cart/:cartItem
export const addCart = async (req:Request, res:Response) => {
    try {
      
      if (!req.params.cartItem) {
        return res.json({ message: "select item to add cart" });
      }
      let cartFind:null| undefined| object = await cartService.getCart({ cartItem:req.params.cartItem,isDelete:false});
      if (cartFind) {
        return res.json({ message: "This product is already added to cart" });
      }
      // let cart:any = 
      let cartItem = await cartService.addCart({ user: req.user._id,cartItem:req.params.cartItem,quantity:req.body.quantity});
      res.json({ newCart: cartItem, message: "cart item is add" });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };
 
//   localhost:5000/api/v1/users/cart/my-cart
  export const getAllCart = async (req:Request, res:Response) => {
    try {
      let cartProduct:null | object| undefined| any = await cartService.getAllCarts({user: req.user._id,isDelete: false});
      let allCartItems = cartProduct.map((e:object|any) => ({
        _id:e._id,
        user:e.user,
        product_id: e.cartItem._id,
        productImage: e.cartItem.productImage,
        price: e.cartItem.price,
        title: e.cartItem.title,
        quantity: e.quantity,
        totalAmount: e.quantity * e.cartItem.price
      }));
      if(allCartItems.length === 0){
        return res.json({ message: "your cart was empty" });
      }
      res.json({ cartItems: allCartItems, message: "all cartItem" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

//   localhost:5000/api/v1/users/cart/get-cart/:id
  export const getCart = async (req:Request,res:Response) =>{
    try {
     let specificCart:null| undefined| object = await cartService.getspacificCarts({ _id:req.params.id,isDelete:false})
      if(!specificCart){
          return res.json({message:"this cartitem not in cart"})
      } 
      res.json({specificCart:specificCart,message:"cart"})
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  }

//    localhost:5000/api/v1/users/cart/update-cart/:id
export const updateCart = async (req:Request, res:Response) => {
    try {
      const quantity:number = parseInt(req.body.quantity, 10);
      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity. Please provide a positive integer." });
      }
       let updateCart:null| undefined| object = await cartService.updateCart({_id:req.params.id,isDelete:false},{quantity:quantity})
       if(!updateCart){return res.json({message:"cart item not found"})} 
  
      res.json({ updateCart: updateCart, message: "your cart quantity updated" });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };
  
//    localhost:5000/api/v1/users/cart/remove-cart/:id
  export const deleteCart = async (req:Request, res:Response) => {
    try {
         let removeCart:null| undefined| object  =  await cartService.removeCart({_id:req.params.id,isDelete:false})
         if (!removeCart) {
          return res.json({ meassage: "Product not found" });
        }
      res.json({message: "your cart item was remove" });
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };