import productCollection from "../../model/admin/product.model";
import { IProduct } from "../../interface/IProduct";

export default class ProductService {
  getProduct = async (body: any) => {
    return await productCollection.findOne<IProduct>(body);
  };
  addProduct = async (body: any) => {
    return await productCollection.create<IProduct>(body);
  };
  getAllProducts = async (body: any) => {
    return await productCollection.find<IProduct>(body);
  };
  productUpdate = async (id: any, body: any) => {
    return await productCollection.findOneAndUpdate<IProduct>(id, body, {new: true});
  };
}
