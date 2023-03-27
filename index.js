import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path";


//* Setup config procces
dotenv.config()

mongoose.connect(
  `mongodb://${process.env.HOST}:${process.env.PORT}/${process.env.DB_NAME}`
);
const db = mongoose.connection;
db.on("connected", () => console.log("Database Connected"));
db.on("error", (err) => console.log(err.message));

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/api", routes);
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  console.log("Server Runing.......");
});
