import User from "../models/user.model.js";
import ApiError from "../utills/error.utills.js"
import jwt from "jsonwebtoken"

const isLoggedIn = async (req, res, next) => {
    try {
        // Check if cookies exist and extract the token
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
        if (!token) {
            return next(new ApiError(401, "Cookies not found or Token not found"));
        }

        // Verify the token
        const userDetail =await jwt.verify(token, process.env.JWT_SECRET);
        // Attach user details to the request object
        req.user = userDetail;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or Expired Token"));
    }
};
const authrizedRoll= (...roles)=> async (req,res,next)=>{
       const currentUserRole=req.user.role ;   
       if (!roles.includes(currentUserRole)) {
           return next(new ApiError(400, "You do not have Permision Access this route"));              
       }
       next()
};
const authrizedSubscriber= async (req,res,next)=>{
       const user= await User.findById(req.user.id)
       const currentUserRole=user.role ;   
       const subscription=user.subscription; 
       if (currentUserRole!=="ADMIN" && subscription.status!=="active") {
        return next(new ApiError(400, "You do not have Permision Access this route"));
       }   
       next()
};

export  {isLoggedIn,authrizedRoll,authrizedSubscriber};
    