import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/react?authSource=admin`
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

  const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => console.log("listening on port 3000!"));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
