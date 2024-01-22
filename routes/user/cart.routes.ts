import express from "express";
const CartRoutes = express.Router();
import {
  addCart,
  getAllCart,
  getCart,
  updateCart,
  deleteCart
} from "../../controller/user/cart.controller";
import verifytoken from "../../helpers/verifyToken";

CartRoutes.post("/add-cart/:cartItem", verifytoken, addCart);
CartRoutes.get("/my-cart", verifytoken, getAllCart);
CartRoutes.get("/get-cart/:id", verifytoken, getCart);
CartRoutes.put("/update-cart/:id", verifytoken, updateCart);
CartRoutes.delete("/remove-cart/:id", verifytoken, deleteCart);

export default CartRoutes;
