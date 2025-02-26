import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Hellers/axiosinstance.js";
import toast from "react-hot-toast";

const initialState={
   chat:[]
}

 export const GetAllChat=createAsyncThunk("get/allchat", async function () {
      try {
          const response=axiosInstance.get(`/chat`)
          toast.promise(response,{
             loading:"Wait!! loading chat",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to get chat"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })
//  export const UploadLectures=createAsyncThunk("add/lecture", async function (lectureData) {
//       try {
          
//           const lectureDataForm=new FormData()
//           lectureDataForm.append("lecture",lectureData.lecture)
//           lectureDataForm.append("title",lectureData.title)
//           lectureDataForm.append("description",lectureData.description)
          
//           const response=axiosInstance.post(`courses/${lectureData.courseId}`,lectureDataForm)
//           toast.promise(response,{
//              loading:"Wait!! uploading lecture",
//              success:((data)=>{
//                return data?.data?.message
//              }),
//              error:"Failed to upload lectures"
//           })
//           return (await response).data
//       } catch (error) {
//           toast.error(error?.response?.data?.message)
//       }
//  })
//  export const RemoveLecture=createAsyncThunk("delete/lecture", async function (courseId,lectureId) {
//       try {
//           const response=axiosInstance.delete(`courses?courseId=${courseId}&lectureId=${lectureId}`)
//           toast.promise(response,{
//              loading:"Wait!! removing lecture",
//              success:((data)=>{
//                return data?.data?.message
//              }),
//              error:"Failed to remove lectures"
//           })
//           return (await response).data
//       } catch (error) {
//           toast.error(error?.response?.data?.message)
//       }
//  })



const ChatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{},
    extraReducers:((builder)=>{
       builder.addCase(GetAllChat.fulfilled,function (state,action) {
            state.chat=action.payload?.data
       })
    })
})


export default ChatSlice.reducer