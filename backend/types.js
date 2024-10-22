const { z } = require("zod");

const createTodo = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const updateTodo = z.object({
  id: z.string().nonempty("ID cannot be empty"),
});

const userTodo = z.object({
  email: z.string().email("Invalid email format"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const userLoginTodo = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

module.exports = {
  createTodo,
  updateTodo,
  userTodo,
  userLoginTodo,
};
