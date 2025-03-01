import multer from "multer";
import {Router} from "express";
import {register,login,logout,profile,forgotPassword,resetPassword, changePassword, updateProfile} from "../controllers/user.controllers.js"
import {isLoggedIn} from "../middlewares/userAuth.js"
import upload from "../middlewares/multer.middleware.js"
const userRoute=Router()

userRoute.post("/register",upload.single('avatar'),register)
userRoute.post("/login",login)
userRoute.get("/logout",logout)
userRoute.post("/forgot_password",forgotPassword)
userRoute.post("/reset_password/:resetToken",resetPassword)
userRoute.get("/profile",(req,res,next)=>{
   console.log(req.cookies);
   next()
},isLoggedIn,profile)
userRoute.post("/change_password",isLoggedIn,changePassword)
userRoute.put("/update/profile",isLoggedIn,upload.single('avatar'),updateProfile)

export default userRoute;