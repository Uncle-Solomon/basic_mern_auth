import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";

dotenv.config(); // Load your env files

const app = express(); // Instantiate an occurence of your express app

// Connect to database
mongoose.connect(process.env.URL).then(() => console.log("DB connected"));

// Define all your middleware
app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("Working on port 8000");
});
