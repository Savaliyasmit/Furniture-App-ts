export interface IProduct {
  _id?: string;
  productImage?: string;
  title: string;
  description: string;
  category: "chair" | "table" | "armchair" | "bed";
  price: Number;
  spacialCategory?: "popular";
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
