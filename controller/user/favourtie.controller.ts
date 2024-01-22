import { Request, Response } from "express";
import { FavouriteService } from "../../services/user/favourite.services";
const favouriteService = new FavouriteService();

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// localhost:5000/api/v1/users/favourite/add-favourite/:productId
export const addFavourite = async (req: Request, res: Response) => {
  try {
    if (!req.params.productId) {
      return res.json({ message: "select product add favourite" });
    }
    let productFind: null | undefined | object = await favouriteService.getFavourite({
        product: req.params.productId,
        isDelete: false
      });
    if (productFind) {
      return res.json({ message: "This item add alredy in favuorite list" });
    }
    let favouriteItem = await favouriteService.addFavourite({
      user: req.user._id,
      product: req.params.productId,
    });
    res.json({ favouriteItem, message: "favourite item is add" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:5000/api/v1/users/favourite/favourites
export const getFavouriteList = async (req: Request, res: Response) => {
  try {
    let product: null | object | undefined | any = await favouriteService.getAllFavourite({
        user: req.user._id,
        isDelete: false
      });

      if (!product || product.length === 0) {
      return res.json({ message: "favourite list empty" });
    }

    let favouriteItems = product.map((e: object | any) => ({
      _id: e._id,
      user: e.user,
      product_id: e.product._id,
      productImage: e.product.productImage,
      price: e.product.price,
      title: e.product.title,
    }));

    res.json({ favouriteItems, message: "your All Favorite item list.." });
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

// localhost:5000/api/v1/users/favourite/get-favourite/:id
export const getFavourite = async (req:Request,res:Response) =>{
    try {
     let specificFavourite:null| undefined| object = await favouriteService.getspacificFavourite({ _id:req.params.id,isDelete:false})

      if(!specificFavourite){
          return res.json({message:"this product not in favouritelist"})
      } 
      res.json({specificFavourite,message:"getFavourite"})
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  }
  
//  localhost:5000/api/v1/users/favourite/remove-favourite/:id
export const deleteFavouriteProduct = async (req:Request, res:Response) => {
    try {
      const  mongoId:null| undefined| object = await favouriteService.removeFavourite({_id:req.params.id,isDelete: false});
      if(!mongoId) {
        return res.json({ message: "This favorite item alredy delete" });
      }
      res.json({message: "Your favorite product has been removed",});
    } catch (error) {
      console.log(error);
      res.json({ message: "Server Error" });
    }
  };
  