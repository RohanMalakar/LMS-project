
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Hellers/axiosinstance.js"
import toast from "react-hot-toast";

const initialState={
  isLoggedIn:localStorage.getItem("isLoggedIn")=="true" || false,
  role:localStorage.getItem("role")|| "",
  data:localStorage.getItem("data") || {}
}

export const createAccount=createAsyncThunk("/auth/sigup", async (data)=>{
   try {
       const res= axiosInstance.post("/user/register",data);
       toast.promise(res,{
         loading:"wait! creating your account",
         success:((data)=>{
             return data?.data?.message;
         }),
         error:"Failed to create account"
       });
       return (await res).data;

   } catch (error) {
      toast.error(error?.response?.data?.message)
   }
})
export const Loginmethod=createAsyncThunk("/auth/login", async (data)=>{
       
   try {
       const res=axiosInstance.post("/user/login",data);
       toast.promise(res,{
         loading:"wait! login in process",
         success:((data)=>{
             return data?.data?.message;
         }),
         error:"Failed to LoggedIn"
       });
       return (await res).data;
   } catch (error) {
      toast.error(error?.message)
   }
})
export const logoutmethod=createAsyncThunk("auth/logout",async()=>{

     try {
       const res= axiosInstance.get("/user/logout")
       toast.promise(res,{
          loading:"wait! logout in process",
          success:((d)=>{
            return d?.data?.message;
          }),
          error:"Logout failed"
       }
       )
       return (await res).data;
     } catch (error) {
        toast.error(error?.response?.data?.message)
     }
})
export const GetUserProfile=createAsyncThunk("get/user/profile",async ()=>{
  
  try {
    const response=axiosInstance.get("/user/profile",{
      withCredentials:true,
      headers:{"Content-Type":"application/json"}
    })
    console.log(response);
    return (await response).data
  } catch (error) {
     console.log(error.message)
  }
  
})
export const updateProfile=createAsyncThunk("user/updateProfile" ,async (data)=>{
     try {
      const formData=new FormData()
      formData.append("fullName",data.fullName)
      formData.append("avatar",data.avatar)

        const response =axiosInstance.put("/user/update/profile",formData)
        
        toast.promise(response,{
         loading:"wait! profile update in process",
         success:((d)=>{
           return d?.data?.message;
         }),
         error:"profile updation failed"
      }
      )
        return (await response).data
     } catch (error) {
         toast.error(error.message)
     } 
})
const authSlice=createSlice({
  name:"authSlice",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{

    builder.addCase(GetUserProfile.fulfilled,(state,action)=>{
      localStorage.setItem("role",action?.payload?.data?.role)
      localStorage.setItem("data",action?.payload?.data)
      state.data=action?.payload?.data
      state.role=action?.payload?.data?.role
    })

    builder.addCase(GetUserProfile.rejected,(state,action)=>{
      localStorage.setItem("role",action?.payload?.data?.role)
      localStorage.setItem("data",action?.payload?.data)
      state.data=action?.payload?.data
      state.role=action?.payload?.data?.role
    })
   
    builder.addCase(createAccount.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn",true)
        localStorage.setItem("role",action?.payload?.data?.role)
        localStorage.setItem("data",action?.payload?.data)
        state.data=action?.payload?.data
        state.role=action?.payload?.data?.role
        state.isLoggedIn=true;
    })
    builder.addCase(Loginmethod.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn",true)
        localStorage.setItem("role",action?.payload?.data?.role)
        localStorage.setItem("data",action?.payload?.data)
        state.data=action?.payload?.data
        state.role=action?.payload?.data?.role
        state.isLoggedIn=true;
    })

    builder.addCase(logoutmethod.fulfilled,(state,action)=>{
        localStorage.setItem("isLoggedIn",false)
        localStorage.setItem("role","")
        localStorage.setItem("data",{})
        state.data={}
        state.role=""
        state.isLoggedIn=false;
    })
  }
})

export const {} = authSlice.actions
export default authSlice.reducer
