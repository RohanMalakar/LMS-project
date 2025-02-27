import {Quiz,Question, SubmittedQuiz} from "../models/quiz.model.js";
import User from "../models/user.model.js";
import ApiError from "../utills/error.utills.js";
import generateQuizSubmissionHTML from "../utills/quizSubmitionMessage.js";
import sendMail from "../utills/sendMail.utills.js";


const createQuiz=async function(req,res,next){

    const {courseId,questions,createdBy,title}=req.body;
    if (!courseId || !questions ||  !title) {
        return next(new ApiError(400,"Course id,title, Questions are required"));
    }
    if (questions.length<1) {
        return next(new ApiError(400,"Atleast one question is required"));
    }
    let questionsArray=[];
    for (const question of questions) {
      const newQuestion = new Question({
          title: question.title,
          options: question.options,
          answer: question.correctAnswer
      });
      await newQuestion.save();
      questionsArray.push(newQuestion);
   }

    
    const quiz= new Quiz({ 
        title:title, 
        courseId:courseId,
        questions:questionsArray,
        createdBy
    });

    await quiz.save();
    
    return res.status(201).json({
        success:true,
        message:"Quiz is created successfully",
        data:quiz
    });
}

const deleteQuiz=async function(req,res,next){
    const {quizId}=req.body;
    const quiz=await Quiz.findById(quizId);
    if (!quiz) {
        return next(new ApiError(404,"Quiz is not exist")); 
    }
    await Quiz.findByIdAndDelete(quizId);
    return res.status(200).json({
        success:true,
        message:"Quiz is deleted successfully",
    });
}

const getQuiz=async function(req,res,next){
    const {quizId}=req.params;
    
    if (!quizId) {
        return next(new ApiError(400,"Quiz id is required"));
    }
    const quiz=await Quiz.findById(quizId); 
    if (!quiz) {
        return next(new ApiError(404,"Quiz is not exist"));
    }
    return res.status(200).json({
        success:true,
        message:"Quiz details",
        data:quiz
    });
} 

const getAllQuiz=async function(req,res,next){
    const {courseId}=req.params;
    if(!courseId){
        return next(new ApiError(400,"Course id is required"));
    }
    const quiz=await Quiz.find({courseId});
    if (!quiz) {
        return next(new ApiError(404,"Quiz is not exist"));
    }
    return res.status(200).json({
        success:true,
        message:"All Quiz",
        data:quiz
    });
}

const submitQuiz=async function(req,res,next){
    const {userId,quizId,score,selectedOptions}=req.body;
    
    if (!quizId || !selectedOptions || !userId) {
        return next(new ApiError(400,"Quiz id, score, selected options and userId are required"));
    }
    const quiz=await Quiz.findById(quizId); 
    if (!quiz) {
        return next(new ApiError(404,"Quiz is not exist"));
    }
   
    const submittedQuiz= new SubmittedQuiz({
        userId,
        quizId,
        selectedOptions,
        score
    });
    await submittedQuiz.save();
    const user=await User.findById(userId);
    if(!user){
        return next(new ApiError(404,"User is not exist"));
    }

    const messageHTML=generateQuizSubmissionHTML(user.fullName,score,selectedOptions.length,quiz.title);

    try {
        await sendMail({
            email:user.email,
            subject:"Quiz submission  Message",
            messageHTML
        });
    } catch (error) {
        console.log("error",error);
    }
    
    return res.status(201).json({
        success:true,
        message:"Quiz is submitted successfully",
        data:submittedQuiz
    });
}
const getSubmittedQuiz=async function(req,res,next){
    const {userId,quizId}=req.body;
    
    if (!quizId ||  !userId) {
        return next(new ApiError(400,"Quiz id and userId are required"));
    }
    const submittedQuiz=await SubmittedQuiz.findOne({userId,quizId}); 
    if (!submittedQuiz) {
        return res.status(201).json({
            success:true,
            message:"You have not submitted this quiz yet",
            data:null
        });
    }
   
    return res.status(201).json({
        success:true,
        message:"submitted quiz data",
        data:submittedQuiz
    });
}

export {
    createQuiz,
    deleteQuiz,
    getQuiz,
    getAllQuiz,
    submitQuiz,
    getSubmittedQuiz
}
