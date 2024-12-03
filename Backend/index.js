import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Model/model.js";
import cors from "cors";
import router from "./Router/router.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin: "https://book-store-frontend-flax.vercel.app", // Your frontend's URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    credentials: true // Allow cookies or authorization headers
}));

app.use(express.json());
// Routes
app.use("/books", router);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://mongo:mongo@cluster0.sg3gm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Server Connected");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
