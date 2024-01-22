import { IReview } from "../../interface/IReview";
import reviewCollection from "../../model/user/review.model";

export class ReviewService {
  getReview = async (body: any) => {
    return await reviewCollection.findOne<IReview>(body);
  };
  addReview = async (body: any) => {
    return await reviewCollection.create<IReview>(body);
  };
  getAllReview = async (data: any) => {
    return await reviewCollection.find<IReview>(data).populate("product");
  };
  getSpacificReview = async (id: any) => {
    return await reviewCollection.findOne<IReview>(id).populate("product");
  };
  reviewUpdate = async (id: any, body: any) => {
    return await reviewCollection.findOneAndUpdate<IReview>(id, body, {new: true});
  };
}
