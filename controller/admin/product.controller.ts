import { Request,Response } from "express"
import ProductService from "../../services/admin/product.services"

const productService  = new ProductService()

// localhost:5000/api/v1/admin/product/add-product
export const addProduct =async (req:Request,res:Response)=>{
    try{
        let product:null|undefined|object= await productService.getProduct({title:req.body.title,isDelete:false});
        if(product){
         return res.json({message:"product alredy exists.."})
        }
        let filePath:any
        if(req.file){
          filePath = `${req.file.path.replace(/\\/g,'/')}`
      }
      let newProduct= await productService.addProduct({
         productImage:filePath,
         ...req.body
      })
       res.json({newProduct,message:"add product sucessfully.."})
     }catch (error) {
       console.log(error);
       res.status(500).json("Internal Server Error..");
     }
}

// localhost:5000/api/v1/admin/product/products
export const getAllProduct = async (req:Request,res:Response) =>{
    try {
      let products:null|undefined|object = await productService.getAllProducts({isDelete: false });
      if (!products) {
        return res.json({message:"products not found"})
      }
      res.json({products,message:"all products"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Internal Server Error.." });
    }
  };

//localhost:5000/api/v1/admin/product/get-product/:id
  export const getSpacificProduct = async (req:Request,res:Response)=>{
    try {
      let mongoId:null| undefined| object = await productService.getProduct({_id:req.params.id,isDelete:false})
      if (!mongoId) {
        return res.json({message:"products not found"})
      }
      return res.json({SpacificProduct:mongoId,message:"spacific item"})
    } catch (error) {
      
    }
  }
 
  // localhost:5000/api/v1/admin/product/update-product/:id
  export const updateProduct = async (req:Request,res:Response) => {
    try {
      let  product:null| undefined| object = await productService.productUpdate({_id:req.params.id,isDelete:false},{...req.body})
      if(!product){
        return res.json({message:"product not found"})
      }
      res.json({ updatedata: product,meassage: "Product is updated..."});
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Internal Server Error.." });
    }
  };

  // localhost:5000/api/v1/admin/product/remove-product/:id
  export const deleteProduct = async (req:Request,res:Response) =>{
    try {
     let product:null| undefined| object =  await productService.productUpdate({_id:req.params.id,isDelete:false},{isDelete:true})
      if (!product) {
        return res.json({ meassage: "Product not found" });
      }
      res.json({meassage: "product delete sucessfully..."});
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Internal Server Error.." });
    }
  }