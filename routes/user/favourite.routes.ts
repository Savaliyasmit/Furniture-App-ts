import express from "express";
const FavouriteRoutes = express.Router();
import {
  addFavourite,
  getFavouriteList,
  deleteFavouriteProduct,
  getFavourite
} from "../../controller/user/favourtie.controller";
import verifytoken from "../../helpers/verifyToken";

FavouriteRoutes.post("/add-favourite/:productId", verifytoken, addFavourite);
FavouriteRoutes.get("/favourites", verifytoken, getFavouriteList);
FavouriteRoutes.get("/get-favourite/:id", verifytoken, getFavourite);
FavouriteRoutes.delete("/remove-favourite/:id",verifytoken,deleteFavouriteProduct);

export default FavouriteRoutes;
