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

const app = express.Router();

app.post("/new", singleAvatar,  newUser);
app.post("/login", login);

app.use(isAuthenticated)

app.get("/me",getMyProfile);

app.get("/logout",logout);

app.get("/search",searchUser)

export default app;