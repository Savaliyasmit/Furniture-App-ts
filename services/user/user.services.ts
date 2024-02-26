import userCollection from "../../model/user/user.model";
import productCollection from "../../model/admin/product.model";
import { IUser } from "../../interface/IUser";
import { IProduct} from "../../interface/IProduct";

export default class UserService {
  addUser = async (body: any) => {
    return await userCollection.create<IUser>(body);
  };
  getUser = async (body: any) => {
    return await userCollection.findOne<IUser>(body).lean()
  };
 
  userUpdate = async (id: any, body: any) => {
    return await userCollection.findOneAndUpdate<IUser>(id, body, {new: true});
  };
  
  getProduct = async (body: any) => {
    return await productCollection.findOne<IProduct>(body).lean()
  };

   getPopularProduct = async () => {
    return await productCollection.aggregate<IProduct>([
      { $match: { spacialCategory: "popular", isDelete: false } },
      {
        $group: {
          _id: "$spacialCategory",
          popular: {
            $push: {
              _id: "$_id",
              productImage: "$productImage",
              title: "$title",
              price: "$price",
            },
          },
        },
      },
      { $unwind: "$popular" },
      { $sort: { "popular.price": -1 } },
    ]);
  };
}
