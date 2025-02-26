import { Router } from "express";
import { getChat, deleteChat, editChat} from "../controllers/chat.controller.js";
import {isLoggedIn} from "../middlewares/userAuth.js";


const chatRouter=Router();

chatRouter.route("/")
.get(isLoggedIn,getChat)
.delete(isLoggedIn,deleteChat)
.put(isLoggedIn,editChat)


export default chatRouter;