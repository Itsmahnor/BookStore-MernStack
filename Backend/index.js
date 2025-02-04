import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import router from "./Router/router.js";

const app = express();

// Middleware
app.use(cors({
    origin: ["https://book-store-frontend-flax.vercel.app", 
             "https://book-store-frontend-chqhv8mam-mahnoors-projects-9520722d.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/books", router);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://mongo:mongo@cluster0.sg3gm.mongodb.net/mongo?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Server Connected");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
