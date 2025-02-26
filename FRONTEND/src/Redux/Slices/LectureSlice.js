import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Hellers/axiosinstance.js";
import toast from "react-hot-toast";

const initialState={
   lectures:[]
}

 export const GetAllCourseLectures=createAsyncThunk("get/alllecture", async function (courseId) {
      try {
          const response=axiosInstance.get(`courses/${courseId}`)
          toast.promise(response,{
             loading:"Wait!! loading lectures",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to get lectures"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })
 export const UploadLectures=createAsyncThunk("add/lecture", async function (lectureData) {
      try {
          
          const lectureDataForm=new FormData()
          lectureDataForm.append("lecture",lectureData.lecture)
          lectureDataForm.append("title",lectureData.title)
          lectureDataForm.append("description",lectureData.description)
          
          const response=axiosInstance.post(`courses/${lectureData.courseId}`,lectureDataForm)
          toast.promise(response,{
             loading:"Wait!! uploading lecture",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to upload lectures"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })
 export const RemoveLecture=createAsyncThunk("delete/lecture", async function (courseId,lectureId) {
      try {
          const response=axiosInstance.delete(`courses?courseId=${courseId}&lectureId=${lectureId}`)
          toast.promise(response,{
             loading:"Wait!! removing lecture",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to remove lectures"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })



const LectureSlice=createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:((builder)=>{
       builder.addCase(GetAllCourseLectures.fulfilled,function (state,action) {
            state.lectures=action.payload?.lectures
       })
       builder.addCase(UploadLectures.fulfilled,function (state,action) {
            state.lectures=[...action.payload?.data?.lectures]
       })
    })
})


export default LectureSlice.reducer