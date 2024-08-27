// import express from "express";
// import { connectDB } from "./utils/features.js";
// import dotenv from 'dotenv';
// import { errorMiddleware } from "./middlewares/erro.js";
// import cookieParser from 'cookie-parser'


// import userRoute from "./routes/user.js";
// import chatRoute from "./routes/chat.js";

// dotenv.configDotenv({
//     path:"./.env"
// });
// const mongoURI=process.env.MONGO_URI;
// connectDB(mongoURI);
// const port=process.env.PORT||3000

// const app=express();

// //middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use("/user",userRoute);
// app.use("/chat", chatRoute);

// app.get("/", (req, res) => {
//     res.send("Hello World");
//   });

// app.use(errorMiddleware);
// app.listen(port,()=>{
//     console.log(`Listening to port ${port}`)
// })


import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv';
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { createUser } from "./seeders/user.js";
import { createGroupChats, createSingleChats } from "./seeders/chat.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";

dotenv.config({
    path: "./.env"
});

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
const port = process.env.PORT || 3000;

const adminSecretKey = process.env.ADMIN_SECRET_KEY || "adsasdsdfsdfsdfd";

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const userSocketIDs = new Map();
// createUser(10)
// createSingleChats(10);
// createGroupChats(10);

const app = express();
const server = createServer(app);
const io = new Server(server, {
    // cors: corsOptions,
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

io.on("connection", (socket) => {


    const user={
        _id:"asdsda",
        name:"Namgo"

    }
//   const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageForRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      throw new Error(error);
    }
    
  });

//   socket.on(START_TYPING, ({ members, chatId }) => {
//     const membersSockets = getSockets(members);
//     socket.to(membersSockets).emit(START_TYPING, { chatId });
//   });

//   socket.on(STOP_TYPING, ({ members, chatId }) => {
//     const membersSockets = getSockets(members);
//     socket.to(membersSockets).emit(STOP_TYPING, { chatId });
//   });

//   socket.on(CHAT_JOINED, ({ userId, members }) => {
//     onlineUsers.add(userId.toString());

//     const membersSocket = getSockets(members);
//     io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//   });

//   socket.on(CHAT_LEAVED, ({ userId, members }) => {
//     onlineUsers.delete(userId.toString());

//     const membersSocket = getSockets(members);
//     io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
//   });

  socket.on("disconnect", () => {
    userSocketIDs.delete(user._id.toString());
    onlineUsers.delete(user._id.toString());
    socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  });


});




app.use(errorMiddleware);

server.listen(port, () => {
    console.log(`Server is running on port ${port} in ${envMode} Mode`);
});


export {  adminSecretKey, envMode, userSocketIDs }