const { Router } = require("express");
const { todoModel } = require("../db");
const { createTodo, updateTodo } = require("../types");
const todoRouter = Router();
const { userMiddleware } = require("../middlewares/user");

todoRouter.post("/create", userMiddleware, async (req, res) => {
  const userId = req.userId;
  const parsedInput = createTodo.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ msg: "You sent the wrong input" });
    return;
  }
  try {
    await todoModel.create({
      title: req.body.title,
      description: req.body.description,
      completed: false,
      creatorId: userId,
    });
    res.json({ msg: "Todo created successfully" });
  } catch (e) {
    console.log(e);
  }
});

todoRouter.put("/complete", userMiddleware, async (req, res) => {
  const parsedInput = updateTodo.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(400).json({ msg: "You sent the wrong input" });
    return;
  }
  try {
    await todoModel.updateOne({ _id: req.body.id }, { completed: true });
    res.json({ msg: "Todo marked as completed" });
  } catch (e) {
    console.log(e);
  }
});

todoRouter.delete("/deleteTodo", userMiddleware, async (req, res) => {
  const todoId = req.body.id;
  const parsedInput = updateTodo.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(400).json({ msg: "You sent the wrong input" });
    return;
  }
  try {
    const todoToDelete = await todoModel.findById(todoId);
    if (!todoToDelete) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    await todoModel.deleteOne({ _id: todoId });
    res.json({ msg: "Todo deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "An error occurred while deleting the todo" });
  }
});

todoRouter.get("/preview", userMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const userTodos = await todoModel.find({ creatorId: userId });

    if (userTodos.length === 0) {
      return res.status(404).json({ message: "No todos found for this user." });
    }

    res.json({ todos: userTodos });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos." });
  }
});

module.exports = {
  todoRouter: todoRouter,
};
