 
 import mongoose from "mongoose"
 mongoose.set("strictQuery",false)
 const conectDB= async ()=>{
  try {
    const {connection}= await mongoose.connect(
       `${process.env.MONGOOSE_URL}`
    )
    if (connection) {
       console.log(`database is sucessfull connected to ${connection.host}`);
    }
  } catch (error) {
     console.log(error);
     process.exit(1);
  }
 }

 export default conectDB;