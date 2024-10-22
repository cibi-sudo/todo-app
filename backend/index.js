const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const { todoRouter } = require("./routes/todo");
const { userRouter } = require("./routes/user");
const app = express();
app.use(express.json());
app.use(cors());

const dburl = process.env.MONGODB_URL;
// console.log(dburl);

app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

async function connectToDb() {
  try {
    await mongoose.connect(dburl);
    app.listen(3000);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDb();
