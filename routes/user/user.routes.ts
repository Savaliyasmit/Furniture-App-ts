import express from "express";
const UserRoutes = express.Router();
import {
  signupUser,
  logout,
  loginUser,
  userProfile,
  updateProfile,
  forgetPassword,
  deleteProfile,
  getPopularProducts,
  getCategoryProducts,
  getSpacificProduct
} from "../../controller/user/user.controller";
import upload from "../../helpers/imageUplode";
import verifytoken from "../../helpers/verifyToken";

UserRoutes.post("/signup", upload.single("profileImage"), signupUser);
UserRoutes.post("/login", loginUser);
UserRoutes.get("/logout",verifytoken,logout)
UserRoutes.get("/profile", verifytoken, userProfile);
UserRoutes.put("/profile-update",verifytoken,upload.single("profileImage"),updateProfile);
UserRoutes.post("/reset-password", verifytoken, forgetPassword);
UserRoutes.get("/popular", getPopularProducts);
UserRoutes.get("/category/:name", getCategoryProducts);
UserRoutes.get("/product/:id",getSpacificProduct);
UserRoutes.delete("/remove-profile", verifytoken, deleteProfile);

export default UserRoutes;
