const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const todoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  creatorId: {
    type: ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const todoModel = mongoose.model("todo", todoSchema);
const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
  todoModel,
};
