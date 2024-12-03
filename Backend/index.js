import express from 'express'
import  {PORT}  from './config.js';
import mongoose from 'mongoose';
import { Book } from './Model/model.js';
import cors from 'cors';
import router from './Router/router.js';
 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cors({
    origin: ["https://book-store-frontend-535wrv0v4-mahnoors-projects-9520722d.vercel.app/"], // Allowed origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    credentials: true // Enable credentials for cookies
}));


app.use("/books",router)
 mongoose.connect("mongodb+srv://mongo:mongo@cluster0.sg3gm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("Server Connected");
  app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
   })
 }).catch((err)=> console.log(err.message));

