import {config} from "dotenv"
config()
import cloudinary from "cloudinary"
import Razorpay from "razorpay";




export const razorpay=new Razorpay({
       key_id:process.env.RAYZORPAY_KEY_ID,
       key_secret:process.env.RAYZORPAY_SECRET
})


cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET
})