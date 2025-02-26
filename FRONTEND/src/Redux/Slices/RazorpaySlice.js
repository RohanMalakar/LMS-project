import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Hellers/axiosinstance.js"

const initialState={
   key:"",
   subscription_id:"",
   isPaymentVerified:false,
   allPayments:{},
   finalMonth:{},
   monthlySalesRecords:[]
}
export const getRazorpayId=createAsyncThunk("/razorpay/getId", async ()=>{
     try {
        const response= await axiosInstance.get("/payment/razorpay-key")
        return response.data

     } catch (error) {
         toast.error("Failed to load data")
     }
 })

export const purchaseCourse=createAsyncThunk("/purchase/Course", async ()=>{
     try {
        const response= await axiosInstance.post("/payment/subscribe")
        return response.data
     } catch (error) {
         toast.error(error?.response?.data?.message);
     }
 })

export const verifyUserPayment=createAsyncThunk("/payment/verify", async (data)=>{
     try {
        const response= await axiosInstance.post("/payment/verify",{
          razorpay_payment_id:data.razorpay_payment_id,
          razorpay_signature:data.razorpay_signature,
          razorpay_subscription_id:data.razorpay_subscription_id
        })
        return response.data
     } catch (error) {
         toast.error(error?.response?.data?.message);
     }
 })
 export const getPaymentRecord=createAsyncThunk("/payment/getrecord", async ()=>{
  try {
     const response= axiosInstance.get("/payment?count=100")
     console.log(response);
     toast.promise(response,{
        loading:"Getting the payment record !!",
        success:(data)=>{
           return data?.data?.message
        },
        error:"Failed to get Payment record"
     })
     return (await response).data
  } catch (error) {
      toast.error("Operation failed");
  }
})
export const cancelSubscribe=createAsyncThunk("/cancel/Subscribe", async ()=>{
  try {
     const response=  axiosInstance.post("/payment/unsubscribe")
     toast.promise(response,{
      loading:"Cancelling subscription",
      success:(data)=>{
         return data?.data?.message
      },
      error:"Failed unsubscribe"
   })
   return (await response).data
  } catch (error) {
      toast.error(error?.response?.data?.message);
  }
})

const razorpaySlice=createSlice({
     name:"razorpay",
     initialState,
     reducers:{},
     extraReducers:(builder)=>{
        builder
        .addCase(getRazorpayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key;
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success;

        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.error(action?.payload?.message)
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(purchaseCourse.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments;
            state.finalMonth=action?.payload?.finalMonth;
            state.monthlySalesRecords=action?.payload?.monthlySalesRecords;
        })
     }
})

export default razorpaySlice.reducer;