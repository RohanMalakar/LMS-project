import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io.connect(
  "https://code-scorer.onrender.com"
   //"http://localhost:5000"
   ,
 { 
  path: "/socket.io",  
  withCredentials: true,
  transports: ["websocket", "polling"],
}
);
import { MdAttachFile } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { VscSend } from "react-icons/vsc";
import { GetAllChat } from "../Redux/Slices/ChatSlices.js";



const Chat = () => {
  const [message, setMessage] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [chat, setChat] = useState([]);
  const userData = useSelector((state) => state?.auth?.data);
  const [emojiPickerState, SetEmojiPickerState] = useState(false);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  

  // Initialize the socket connection and set up the message listener
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    const handleReceiveMessage = (data) => {
      if(data.success===false){
        return;
      }
      setChat((chat) => [...chat, data.data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup listener on unmount
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  function GetImage(e) {
    e.preventDefault();
    SetEmojiPickerState(false);
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImage(this.result);
      });
    }
  }

  const handleImageDelete = () => {
    setImage("");
    setImageMessage("");
  };
  const getChats = async () => {
    try {
      const response =await dispatch(GetAllChat());
      if (response?.payload.success === false) {
        return;
      }
      setChat(response?.payload?.data);

    } catch (error) {
      console.error("Failed to get chat", error);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const time=new Date();
      const chatMessage = { image:image,senderId:userData._id,senderName: userData.fullName, message: message,time:time }; 
      socket.emit("send_message", chatMessage); 
      SetEmojiPickerState(false);
      setMessage("");
    }
  };
  const sendImage=()=>{

    // if (imageMessage.trim()) {
    //   const time=new Date();
    //   const chatMessage = { image:image,user: userData.fullName, text: imageMessage,time:time }; 
    //   console.log(chatMessage);
    //   socket.emit("send_message", chatMessage); 
      setImage(""); 
      setImageMessage("");
    // }
  }

  useEffect(() => {
     getChats();
  
    // return () => {
    //   second
    // }
  }, [])
  

  return (
    <div className="flex flex-col bg-black w-screen items-center justify-center h-screen ">
      <div className="w-[80%] relative text-black h-[90%] bg-slate-400 shadow-lg rounded-lg p-4">
        <h1 className="text-2xl text-white font-bold mb-4 text-center">Chat App</h1>
        <div className="h-[80%] overflow-y-scroll border rounded-md p-2 mb-4">
          {chat.map((msg, index) => (
            <div
              key={index}
            > 
             {
                msg.senderName === userData.fullName ? 
                <div className="p-2 w-[60%] rounded-lg relative left-[40%] my-2 bg-blue-100 self-end  h-fit ">
                  <span className=" mb-2 rounded-lg font-bold text-right">You</span>
                  <br />
                  {msg.message}
                  <span className="absolute bottom-1 right-2 text-xs text-gray-700">
                    {new Date(msg.time).toLocaleTimeString()}
                  </span>
                </div>
                :
                <div className="p-2 w-[60%] relative my-2 rounded-lg bg-gray-100 left-1">
                  <span className="font-bold text-right">{msg.senderName}</span>
                  <br />
                  {msg.message}
                  <span className="absolute bottom-1 right-2 text-xs text-gray-700">
                    {new Date(msg.time).toLocaleTimeString()}
                  </span>
                </div>
             }
            </div>
          ))}
        </div>
        <div className="flex relative gap-2 px-5 items-center space-x-2">
            <GrEmoji 
              className="text-black hover:scale-125 transition duration-1000 ease-in-out mx-auto z-50 cursor-pointer text-3xl"
              onClick={()=>SetEmojiPickerState(!emojiPickerState)} 
            />
            <label
                className="cursor-pointer hover:scale-125 transition duration-1000 ease-in-out mx-auto"
                htmlFor="uoload_image"
              >
              <MdAttachFile className="text-black z-50 rotate-45 cursor-pointer text-2xl" />
            </label>
            <input
                type="file"
                required
                className="hidden"
                name="uoload_image"
                id="uoload_image"
                accept=".jpeg,.jpg,.png,.svg"
                onChange={GetImage}
              />
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
              className="input text-white input-bordered w-full"
            />
          <button onClick={sendMessage} className="btn bg-green-600 border-transparent px-8  btn-info">
             <VscSend/>
          </button>
        </div>
        <div className="flex absolute bottom-20 left-2  items-center">
            <EmojiPicker 
              className="absolute bottom-5 left-6"
              onEmojiClick={(emojiObject) => {
                setMessage((e)=>e+emojiObject.emoji)
              }}
              open={!image && emojiPickerState}
            />
        </div>
        {image && (
          <div className="flex flex-col w-96 pt-10 absolute bg-gray-700 rounded-2xl  bottom-24 left-6">
            <RiDeleteBin6Line
              className="text-2xl absolute top-2 right-3 text-white cursor-pointer"
              onClick={handleImageDelete}
            />
            <img
              src={image}
              className="w-full flex-grow-1 border "
              alt="image"
            />
            <div className="flex relative py-5 gap-3 px-5  ">
              <input
              type="text"
              value={imageMessage}
              onChange={(e) => setImageMessage(e.target.value)}
              placeholder="Type your message"
              className="input text-white input-bordered w-full h-12"
             />
             <button onClick={sendImage} className="btn bg-green-600 border-transparent px-8  btn-info">
                <VscSend/>
             </button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
