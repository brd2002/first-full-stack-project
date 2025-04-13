import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.js";
dotenv.config();
const app = express();

// * cors is required for cross origin resource sharing need to  learn
app.use(
  cors({
    // * from where you want to request
    origin: process.env.BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json()); 
// url encoding is required 
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("hello world");
});
// connect to db
db();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
