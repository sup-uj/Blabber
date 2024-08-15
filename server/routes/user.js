import express from "express";
import {
    login,
    newUser,
} from "../controllers/user.js";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { logout } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { searchUser } from "../controllers/user.js";
import { loginValidator, registerValidator } from "../lib/validators.js";
import { validateHandler } from "../lib/validators.js";
import { sendFriendRequest } from "../controllers/user.js";
import { sendRequestValidator } from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registerValidator(), validateHandler, newUser);
app.post("/login", loginValidator(),validateHandler,login);

app.use(isAuthenticated)

app.get("/me",getMyProfile);

app.get("/logout",logout);

app.get("/search",searchUser);

app.put(
    "/sendrequest",
    sendRequestValidator(),
    validateHandler,
    sendFriendRequest
  );


export default app;