import toast from "react-hot-toast"
import axiosInstance from "../../Hellers/axiosinstance.js"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    coursedata:[]
}
 export const GetAllCourses=createAsyncThunk("courses/get",async()=>{
     try {
        const response=axiosInstance.get("/courses")
        toast.promise(response,{
          loading:"loading course data....",
          success:((data)=>{
             return(data?.data?.message)
          }),
          error:"Failed to get the courses"
        })
        return (await response).data.data
     } catch (error) {
        toast.error(error?.response?.data?.message)
     }
 })
 export const removeCourseMethod=createAsyncThunk("course/delete",async(courseId)=>{
     try {
        const response=axiosInstance.delete(`/courses/${courseId}`)
        toast.promise(response,{
          loading:"deleting course",
          success:((data)=>{
             return(data?.data?.message)
          }),
          error:"Failed to delete the courses"
        })
        return (await response).data
     } catch (error) {
        toast.error(error?.response?.data?.message)
     }
 })
export const CreateNewCourse=createAsyncThunk ("create/course", async (formData)=>{
   try {

       const response=axiosInstance.post("/courses",formData)
       toast.promise(response,{
          loading:"wait! course is creating",
          success:((data)=>{
             return data?.data?.message
          }),
          error:"course is not creating"
       })
       
       return (await response).data.data

   } catch (error) {
      toast.error(error?.message)
   }
})
 const CourseSlice=createSlice({
  name:"CourseSlice",
  initialState,
  reducers:{
      
  },
  extraReducers:(builder)=>{
     builder.addCase(GetAllCourses.fulfilled,(state,action)=>{
         if (action.payload) {
            state.coursedata=[...action.payload];
         }
     })
  }
  }
 )
 export default CourseSlice.reducer;
