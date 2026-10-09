import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import connectDB from "./config/db.js";
const app = express();
const PORT = process.env.PORT || 4000;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(multer().none());

connectDB();

//Mounting Routes

app.get("/", (req, res) => {
  res.status(200).json({ succes: true, message: "API is working" });
});

app.listen(PORT, () => {
  console.log(`app is listening at Port: http://localhost:${PORT}`);
});
