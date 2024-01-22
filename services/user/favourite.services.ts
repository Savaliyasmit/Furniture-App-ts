import { IFavourite } from "../../interface/IFavourite";
import favouriteCollection from "../../model/user/favourite.model";

export class FavouriteService {
  getFavourite = async (body: any) => {
    return await favouriteCollection.findOne<IFavourite>(body);
  };
  addFavourite = async (body: any) => {
    return await favouriteCollection.create<IFavourite>(body);
  };
  removeFavourite = async (id: any) => {
    return await favouriteCollection.findOneAndDelete<IFavourite>(id);
  };
  getAllFavourite = async (data: any) => {
    return await favouriteCollection.find<IFavourite>(data).populate("product");
  };
  getspacificFavourite = async (data: any) => {
    return await favouriteCollection.findOne<IFavourite>(data).populate("product");
  };
}
