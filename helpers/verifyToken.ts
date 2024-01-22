import Jwt from "jsonwebtoken";
import userCollection from "../model/user/user.model";
import { Request,Response,NextFunction } from "express";

declare global{
  namespace Express{
    interface Request{
      user?:any;
    }
  }
}

const verifytoken = async (req:Request, res:Response, next:NextFunction) => {
  try {
    let token:string|null|undefined|any= req.headers["authorization"]?.split(" ")[1];

    let decodetoken:object|null|any = Jwt.verify(token,`${process.env.SECRET_KEY}`);
    
     let userId:string|null|undefined = decodetoken.userId
    req.user = await userCollection.findById(userId);

    if (req.user) {
      next();
    } else {
      res.json({ message: "Invalid user" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Server Error" });
  }
};

export default verifytoken