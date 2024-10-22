import { useState, useEffect } from "react";
import axios from "axios";

export function Todos({ todos }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const markTodoCompleted = (id) => {
    axios
      .put("http://localhost:3000/api/v1/todo/completed", { id })
      .then(() => {
        setTodoList((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete("http://localhost:3000/api/v1/todo/deleteTodo", { id })
      .then(() => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-4 bg-gradient-to-r from-blue-500 to-pink-500 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <div
            key={todo._id}
            className={`p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
              todo.completed
                ? "bg-green-100 border-green-500"
                : "bg-white border-gray-200"
            } border`}
          >
            <h1 className="text-2xl font-bold text-gray-800">{todo.title}</h1>
            <h2 className="mb-4 text-lg text-gray-600">{todo.description}</h2>
            <button
              onClick={() => markTodoCompleted(todo._id)}
              className={`py-2 px-4 rounded w-full text-center font-semibold ${
                todo.completed
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={todo.completed}
            >
              {todo.completed ? "Completed" : "Mark as Completed"}
            </button>

            <button
              className="absolute px-2 py-1 font-bold text-white bg-red-500 rounded cursor-pointer top-2 right-2 hover:bg-red-600 focus:outline-none focus:shadow-outline"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-white col-span-full">
          No todos to display
        </p>
      )}
    </div>
  );
}
