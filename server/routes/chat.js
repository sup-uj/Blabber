import express from "express";
import {
    getMyGroups,
  newGroupChat,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { getMyChats } from "../controllers/chat.js";
import { addMembers } from "../controllers/chat.js";
import { removeMember } from "../controllers/chat.js";
import { leaveGroup } from "../controllers/chat.js";
import { sendAttachments } from "../controllers/chat.js";
import { getChatDetails } from "../controllers/chat.js";
import { renameGroup } from "../controllers/chat.js";
import { deleteChat } from "../controllers/chat.js";
import { getMessages } from "../controllers/chat.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups",getMyGroups);

app.put("/addmembers", addMembers);

app.put("/removemember",removeMember);

app.delete("/leave/:id",  leaveGroup);

app.post("/message",attachmentsMulter,sendAttachments);

app.get("/message/:id", getMessages);

app
  .route("/:id")
  .get( getChatDetails)
  .put(renameGroup)
  .delete(deleteChat);



export default app;