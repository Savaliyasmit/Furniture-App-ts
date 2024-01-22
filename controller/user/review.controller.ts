import { Request,Response } from "express";
import {ReviewService} from "../../services/user/review.services"
const reviewService = new ReviewService()

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

//  localhost:5000/api/v1/users/review/add-review/:id 
export const addReview = async (req:Request,res:Response) =>{
    try {
         if(!req.params.id){
            return res.json({message:"select product to give review"})
         }
         let foundReview:null|undefined|object= await reviewService.getReview({product:req.params.id,isDelete: false})
         if(foundReview){
           return res.json({message:"your already give review"})
         }
         let createReview = await reviewService.addReview({ user:req.user._id,product:req.params.id,
               review:req.body.review
         })
         res.json({newReview:createReview,message:"show review in my-reviews"})
    } catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

//  localhost:5000/api/v1/users/review/my-reviews
export const getAllReview = async (req:Request,res:Response)=>{
    try {
        let review:object| null| undefined|any= await reviewService.getAllReview({user: req.user._id,isDelete: false})
        if (!review || review.length === 0) {
            return res.json({ message: "my reviews empty..." });
          }
           
        let userReviews = review.map((e:any) =>({
            _id:e._id,
            user: req.user._id,
            product_id:e.product._id,
            productImage:e.product.productImage,
            title:e.product.title,
            price:e.product.price,
            review:e.review,
            createdAt:e.createdAt,
            updatedAt:e.updatedAt
        
         }))
        res.json({ userReviews, message: "All reviews you have sent" });

    } catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

// localhost:5000/api/v1/users/review/get-review/:id
export const getReview = async (req:Request,res:Response) =>{
    try {
   
        let spacificReview:object|undefined|null= await reviewService.getSpacificReview({_id:req.params.id,isDelete: false})
        if(!spacificReview){
            return res.json({message:"review not found"})
        } 
        res.json({spacificReview,message:"product review"})
    } catch (error) {
        console.log(error);
        res.json({ message: "Server Error" });
    }
}

// localhost:5000/api/v1/users/review/update-review/:id
export const updateReview = async (req:Request,res:Response)=>{
    try{
    let updateReview:object|undefined|null = await reviewService.reviewUpdate({_id:req.params.id,isDelete:false},{review:req.body.review});
    if(!updateReview){
        return res.json({message:"review not found.."})
    }
      res.json({updateReview,message: "update review sucessfully..." });
    }catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}

//  localhost:5000/api/v1/users/review/remove-review/:id
export const deleteReview = async (req:Request,res:Response) =>{
    try{
         let removeReview:object|undefined|null = await reviewService.reviewUpdate({_id:req.params.id,isDelete:false},{isDelete:true})
         if( !removeReview){
            return res.json({message:"review not found ..."})
        }
         res.json({ message: "delete review sucessfully..." });
         
    }catch (error) {
        console.log(error);
    res.json({ message: "Server Error" });
    }
}
