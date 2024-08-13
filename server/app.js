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
import { createUser } from "./seeders/user.js";

dotenv.config({
    path: "./.env"
});

const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);
const port = process.env.PORT || 3000;
// createUser(10)

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
