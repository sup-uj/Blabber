import express from "express";
import {
  newGroupChat,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);



export default app;