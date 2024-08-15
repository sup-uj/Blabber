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
import { addMemberValidator, newGroupValidator, removeMemberValidator, sendAttachmentsValidator } from "../lib/validators.js";
import { validateHandler } from "../lib/validators.js";
import { chatIdValidator } from "../lib/validators.js";
import { renameValidator } from "../lib/validators.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupValidator(),validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups",getMyGroups);

app.put("/addmembers",addMemberValidator,validateHandler, addMembers);

app.put("/removemember",removeMemberValidator,validateHandler,removeMember);

app.delete("/leave/:id", chatIdValidator(),validateHandler, leaveGroup);

app.post("/message",attachmentsMulter,sendAttachmentsValidator,validateHandler, sendAttachments);

app.get("/message/:id", chatIdValidator(),validateHandler,getMessages);

app
  .route("/:id")
  .get( chatIdValidator(), validateHandler,getChatDetails)
  .put(renameValidator(),validateHandler,renameGroup)
  .delete(chatIdValidator(), validateHandler,deleteChat);



export default app;