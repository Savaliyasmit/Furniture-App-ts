import express from "express";
import {
  addReview,
  getAllReview,
  getReview,
  updateReview,
  deleteReview,
} from "../../controller/user/review.controller";
import verifytoken from "../../helpers/verifyToken";

const ReviewRoutes = express.Router();

ReviewRoutes.post("/add-review/:id", verifytoken, addReview);
ReviewRoutes.get("/my-reviews", verifytoken, getAllReview);
ReviewRoutes.delete("/remove-review/:id", verifytoken, deleteReview);
ReviewRoutes.patch("/update-review/:id", verifytoken, updateReview);
ReviewRoutes.get("/get-review/:id", verifytoken, getReview);

export default ReviewRoutes;
