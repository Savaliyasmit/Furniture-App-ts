import express from "express";
import UserRoutes from "./user.routes";
import ProductRoutes from "../admin/product.routes";
import CartRoutes from "./cart.routes";
import FavouriteRoutes from "./favourite.routes";
import OrderRoutes from "./order.routes";
import ReviewRoutes from "./review.routes";
const UserRouter = express.Router();
const ProductRouter = express.Router();

UserRouter.use("/user", UserRoutes);
UserRouter.use("/cart", CartRoutes);
UserRouter.use("/favourite", FavouriteRoutes);
UserRouter.use("/order", OrderRoutes);
UserRouter.use("/review", ReviewRoutes);
ProductRouter.use("/product", ProductRoutes);

export { UserRouter, ProductRouter };
