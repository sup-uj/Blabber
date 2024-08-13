import express from "express";
import {
    getMyGroups,
  newGroupChat,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { getMyChats } from "../controllers/chat.js";
import { addMembers } from "../controllers/chat.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups",getMyGroups);

app.put("/addmembers", addMembers);


export default app;