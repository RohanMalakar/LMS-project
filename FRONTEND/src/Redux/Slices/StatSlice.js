import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Hellers/axiosinstance.js"

const initialState={
   allUserCount:0,
   subscribedCount:0
}

export const GetStats=createAsyncThunk("/get/stats",async ()=>{
    try {
        const response=axiosInstance.get("data/admin/stats/users");
        toast.promise( response, {
           loading:"Wait!! Getting the stats....",
           success:(data)=>{
             return data?.data?.message
           },
           error:"Failed to load data"
        });
        return (await response).data
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
})

const StatSlice=createSlice({
   name:"state",
   initialState,
   reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(GetStats.fulfilled,(state,action)=>{
           
           state.allUserCount=action?.payload?.allUsersCount;
           state.subscribedCount=action?.payload?.subscribedUsersCount;
       })
    }
})

export default StatSlice.reducer