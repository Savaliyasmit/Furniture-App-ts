import { Request,Response } from "express";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import productCollection from "../../model/admin/product.model";
import { IProduct } from "../../interface/IProduct";
import UserService from "../../services/user/user.services";
const userService = new UserService();


declare global{
  namespace Express{
    interface Request{
      user?:any;
    }
  }
}

//  localhost:5000/api/v1/users/user/signup
export const signupUser = async (req:Request,res:Response)=>{
    try {
        let user:object|null|undefined = await userService.getUser({ email: req.body.email, isDelete: false });
        if (user) {
          return res.json({ meassage: "user already exists..." });
        }
         let filePath:string | any;
        if (req.file) {
          filePath = `${req.file.path.replace(/\\/g, "/")}`;
        }
        if (!filePath) {
          return res.status(400).json({ message: "Profile image is required." });
        }
        let hashPassword:string = await bcrypt.hash(req.body.password, 10);
        user = await userService.addUser({
          ...req.body,
          profileImage: filePath,
          password: hashPassword,
          
        });
        res.status(201).json({ newuser:user, message: "user signup sucessfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    };
     
    //  localhost:5000/api/v1/users/user/login
    export const loginUser = async (req:Request, res:Response) => {
      try {
        let user:object|null|undefined|any = await userService.getUser({ email: req.body.email, isDelete: false });
        if (!user) {
          return res.json({ meassage: "account does not exists..." });
        }
        let checkPassword:boolean = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
          return res.json({ meassage: "password is not match..." });
        }
        let payload= {
          userId: user._id,
        };
        let token:string = Jwt.sign(payload, `${process.env.SECRET_KEY}`);
        
        res.json({ user, Token: token, message: "your login sucessfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    };
    
    // localhost:5000/api/v1/users/user/profile
    export const userProfile = async (req:Request, res:Response)=>{
      try {
        let user:object|null|undefined = await userService.getUser({_id:req.user._id,isDelete: false});
        if (!user) {
          return res.json({ meassage: "user not found..." });
        }
        res.json({user,message:"your profile"})
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    }
    
    //localhost:5000/api/v1/users/user/profile-update
    export const updateProfile = async (req:Request, res:Response) => {
      try {
        let filePath: string | any;
        if (req.file) {
          filePath = `${req.file.path.replace(/\\/g, "/")}`;
        }
        let userUpdate = await userService.userUpdate({_id:req.user._id,isDelete: false},{profileImage:filePath,...req.body})
       if(!userUpdate){
        return res.json({ meassage: "user not found..." });
       }
        res.json({user: userUpdate,massage: "your profile update sucessfully..."});
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    };
    
    // localhost:5000/api/v1/users/user/reset-password
    export const forgetPassword = async (req:Request, res:Response) => {
      try {
        let isValidPassword:boolean = await bcrypt.compare(
          req.body.currentPassword,
          req.user.password
        );
        if (!isValidPassword) {
          return res.json({ message: "Current password is incorrect" });
        }
    
        if (req.body.newPassword !==  req.body.confirmPassword) {
          return res.json({ message: "Password is not matched" });
        }
    
        let hashPassword:string = await bcrypt.hash( req.body.newPassword, 10);
        let updatePassword = await userService.userUpdate({_id:req.user._id,isDelete: false},{ password: hashPassword});
    
        res.json({ user: updatePassword, message: "password was reset" });
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    };

  //  localhost:5000/api/v1/users/user/remove-profile
    export const deleteProfile = async(req:Request, res:Response)=>{
      try {
        let userId:object|null|undefined = await userService.userUpdate({_id:req.user._id,isDelete: false},{isDelete:true})
        if(!userId){
          return res.json({message:"your profile not found"})
        }
        res.json({message:"your profile was deleted"})
      } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Internal Server Error.." });
      }
    }
  
    // localhost:5000/api/v1/users/user/popular
    export const getPopularProducts = async (req:Request, res:Response) => {
      try {
        let products:object|null|undefined|any = await userService.getPopularProduct()
        if(products.length === 0){
          return res.json({message:"not have any product popular"})
        }
        res.json({products,message:"popular products"});
      } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Internal Server Error.." });
      }
    };
    
    // localhost:5000/api/v1/users/user/category/:name
    export const getCategoryProducts = async (req:Request, res:Response) => {
      try {
        let products:object|null|undefined|any = await productCollection.aggregate<IProduct>([
          {$match:{category:`${req.params.name}`,isDelete: false}},
          {
              $group: {
                  _id:"$category",
                  category: {$push:{_id:"$_id",productImage:"$productImage",title:"$title",price:"$price",spacialCategory:"$spacialCategory"}}
              }
          },
          { $unwind: "$category" }
         ])
          if(products.length === 0){
            return res.json({message:"this category not exists"})
          }
        res.json({products,message:"spacific category products"});
      } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: "Internal Server Error.." });
      }
    };

    // localhost:5000/api/v1/users/user/product/:id
    export const getSpacificProduct = async (req:Request,res:Response)=>{
      try {
        let mongoId:null| undefined| object = await userService.getProduct({_id:req.params.id,isDelete:false})
        if (!mongoId) {
          return res.json({message:"products not found"})
        }
        return res.json({SpacificProduct:mongoId,message:"spacific item"})
      } catch (error) {
        
      }
    }
      
    // localhost:5000/api/v1/users/user/login
    export const logout = async (req:Request,res:Response)=>{
      try {
        res.json({ message: "Logout successful go to localhost:5000/api/v1/users/user/login" });
       
      } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error..");
      }
    }