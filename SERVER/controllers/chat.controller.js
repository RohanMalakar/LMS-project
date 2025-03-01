import ApiError from "../utills/error.utills.js";
import Chat from "../models/chat.model.js";


const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.find({});
    return res.status(200).json({
      success: true,
      message: "this is chat details",
      data: chat,
    });
  } catch (error) {
    return next(new ApiError(409, error.message));
  }
};

const createChat = async (data) => {
  try {
    const {senderName, senderId, message, time, image} = data;
   
    if (!senderName || !senderId || (!message && !image) || !time) {
      return {success:false,message:"senderName, senderId, message, time are required"};
    }
  
    const chat = new Chat({
      senderName,
      senderId,
      message:message || "",
      time,
      image:image || "",
    });
    if (!chat) {
      return {success:false,message:"Chat is not created"};
    }
    await chat.save();
    return {success:true,message:"Chat is created",data:chat};
  } catch (error) {
     console.log(error.message)
  }
};

const deleteChat = async (req, res, next) => {
  const { chatId } = req.body;
  if (!chatId) {
    return next(new ApiError(409, "Id is required"));
  }

  const chat = await Chat.findByIdAndDelete(chatId);

  if (!chat) {
    return next(new ApiError(409, "Chat is not deleted"));
  }

  return res.status(200).json({
    success: true,
    message: "Chat is deleted",
  });
};

const editChat = async (req, res, next) => {
  const { chatId, message} = req.body;

  if (!chatId) {
    return next(new ApiError(409, "Id is required"));
  }
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ApiError(409, "Chat is not available on this id"));
  }
  chat.message = message || chat.message;
  await chat.save();
  return res.status(200).json({
    success: true,
    message: "Chat is edited",
    data: chat,
  });
}

export { getChat, createChat, deleteChat, editChat };
