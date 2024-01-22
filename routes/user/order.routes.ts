import express from "express";
const OrderRoutes = express.Router();
import {
  addOrder,
  getOrder,
  getAllOrder,
  cancelOrder
} from "../../controller/user/order.controller";
import verifytoken from "../../helpers/verifyToken";

OrderRoutes.post("/add-order", verifytoken, addOrder);
OrderRoutes.get("/get-order/:id", verifytoken, getOrder);
OrderRoutes.get("/my-order", verifytoken, getAllOrder);
OrderRoutes.delete("/remove-order/:id", verifytoken, cancelOrder);

export default OrderRoutes;
