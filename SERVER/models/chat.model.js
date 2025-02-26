import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  { 
    senderName: {
      type: String,
      required: true,
    },
    senderId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      default: "",
    },
    time:{
      type: String,
      required:true
    },
    image:{
      type: String,
      default:""
    }
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;