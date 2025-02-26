

import { Schema, model } from "mongoose";

const SubscriptionModel=new Schema({
    userId:{
       type:String,
       required:true
    },
    courseId:[
      {
       type:String,
       required:true
      }
    ],
},{
  timestamps:true
})

const Subscribe=model("Subscribe",SubscriptionModel)

export default Subscribe;