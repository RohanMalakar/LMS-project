import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Hellers/axiosinstance.js";
import toast from "react-hot-toast";

const initialState={
   quizzes:[]
}

 export const GetAllQuizzesOfCourse=createAsyncThunk("get/allQuizzes", async function (coursedata) {
      try {
          const response=axiosInstance.get(`quizzes/${coursedata.courseId}/getAll`)
          toast.promise(response,{
             loading:"Wait!! loading quizzes",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to get quizzes"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })

 export const AddQuiz=createAsyncThunk("add/Quiz", async function (data) {
      try {
          const QuizDataForm={title:data.title,courseId:data.courseId,questions:data.questions}
          const response=axiosInstance.post(`/quizzes`,QuizDataForm)
          toast.promise(response,{
             loading:"Wait!! uploading Quiz",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to add Quiz"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })

 
 export const submitQuiz=createAsyncThunk("submit/Quiz", async function (data) {
      try {
          const response=axiosInstance.post(`/quizzes/${data.quizId}/submit`,data)
          toast.promise(response,{
             loading:"Wait!! submitting Quiz",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to submit Quiz"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })
 export const getSubmittedQuiz=createAsyncThunk("submitted/Quiz", async function (data) {
      try {
          const response=axiosInstance.post(`/quizzes/${data.quizId}/getSubmitted`,data)
        //   toast.promise(response,{
        //      loading:"Wait!! getting Quiz data",
        //      success:((data)=>{
        //        return data?.data?.message
        //      }),
        //      error:"Quiz is not submitted"
        //   })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })

 export const RemoveQuiz=createAsyncThunk("delete/lecture", async function (quizId) {
      try {
          const response=axiosInstance.delete(`quizzes`,{data:{quizId}})
          toast.promise(response,{
             loading:"Wait!! removing quiz",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to remove quiz"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })
 export const getQuiz=createAsyncThunk("get/quiz", async function (data) {
      try {
          const response=axiosInstance.get(`quizzes/${data.quizId}/getA`)
          toast.promise(response,{
             loading:"Wait!! getting quiz",
             success:((data)=>{
               return data?.data?.message
             }),
             error:"Failed to get quiz"
          })
          return (await response).data
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }
 })

const QuizSlice=createSlice({
    name:"Quiz",
    initialState,
    reducers:{},
    extraReducers:((builder)=>{
       builder.addCase(GetAllQuizzesOfCourse.fulfilled,function (state,action) {
            state.quizzes=action.payload.data
       })
    })
})


export default QuizSlice.reducer