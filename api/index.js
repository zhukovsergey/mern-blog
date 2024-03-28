import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/react?authSource=admin`
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("listening on port 3000!"));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
