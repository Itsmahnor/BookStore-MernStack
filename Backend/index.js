import express from 'express'
import  {PORT}  from './config.js';
import mongoose from 'mongoose';
import { Book } from './Model/model.js';
import cors from 'cors';
import router from './Router/router.js';
 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cors());

app.use("/books",router)
 mongoose.connect("mongodb://localhost:27017/Books-Record").then(()=>{
  console.log("Server Connected");
  app.listen(PORT,()=>{
    console.log(`App is listening to port ${PORT}`);
   })
 }).catch((err)=> console.log(err.message));

