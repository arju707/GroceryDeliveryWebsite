import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import 'dotenv/config'
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";


const app=express();

const port = process.env.PORT|| 4000;

await connectDB()
await connectCloudinary()

const allowedOrigins = ['http://localhost:5173']

//midleware

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true  }));



app.get('/',(req,res)=>res.send("API IS WORKING"));

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
});