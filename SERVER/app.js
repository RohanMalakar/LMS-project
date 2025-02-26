import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import userRoute from "./routers/user.route.js";
import errorMiddleware from "./middlewares/error.middlewares.js";
import courseRoute from "./routers/course.route.js";
import paymentRoute from "./routers/payment.routs.js";
import mescellaniousRoute from "./routers/miscellaneous.js";
import quizRouter from "./routers/quiz.route.js";
import emailRouter from "./routers/email.route.js";
import chatRouter from "./routers/chat.route.js";
import { createChat } from "./controllers/chat.controller.js";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/data", mescellaniousRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/email", emailRouter);
app.use("/api/v1/chat", chatRouter);

// Default Route
app.get("/", (req, res) => {
  res.send("Hey, I am Rohan Malakar");
});

// 404 Handler
app.all("*", (req, res) => {
  res.status(404).send("OOPS! Page not found");
});

// Error Middleware
app.use(errorMiddleware);

// Socket.io Setup
const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    try {
      const response = await createChat(data);
      if (!response.success) {
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

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
export { io };
