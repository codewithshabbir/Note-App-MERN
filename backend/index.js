import express from "express";
import mongoose, { Error } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import noteRouter from "./routes/noteRoute.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected MongoDB");
}).catch((err)=>{
    console.log(err);
})

const app = express();

// to make unput as json
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    'https://notepluss.vercel.app',
    'http://localhost:5173',
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else{
            callback(new Error("Not allowed by cors"));
        }
    },
    credentials: true
}))

// app.listen(3000, ()=>{
//     console.log('Server is running on port 3000');
// })

// routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

// error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})