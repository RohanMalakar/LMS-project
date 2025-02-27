import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routers/user.route.js"
import errorMiddleware from "./middlewares/error.middlewares.js";
import courseRoute from "./routers/course.route.js";
import paymentRoute from "./routers/payment.routs.js";
import mescellaniousRoute from "./routers/miscellaneous.js";
import quizRouter from "./routers/quiz.route.js";
import { Server } from "socket.io";
import http from "http";
import emailRouter from "./routers/email.route.js";
import {createChat} from "./controllers/chat.controller.js";
import chatRouter from "./routers/chat.route.js";

const app=express();
const server = http.createServer(app);
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: [process.env.FRONTEND_URL],
//     credentials:true
// }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(express.urlencoded({extended:true,limit:"16kb"}));


app.use("/api/v1/data",mescellaniousRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/courses",courseRoute);
app.use("/api/v1/quizzes",quizRouter);
app.use("/api/v1/email",emailRouter);
app.use("/api/v1/chat",chatRouter);

app.use("/",(req,res)=>{
  res.send("Hey I am rohan malakar")   
});


app.all("*",(req,res,next)=>{
      res.status(404)
      res.send("OOPS! page not found")   
});

app.use(errorMiddleware)

const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {

  socket.on("send_message", async (data) => {
    try {
      const response=await createChat(data);
      if(response.success===false){
        socket.emit("message_error", { message: "Failed to send message" });
        return;
      }
      io.emit("receive_message", response);
    } catch (error) {
      console.error(error);
      socket.emit("message_error", { message: "Failed to send message" });
    }
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});


export default app;
export {io};
