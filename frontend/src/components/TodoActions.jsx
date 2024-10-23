import { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { IoCheckmark, IoAddCircleOutline } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";

const token = localStorage.getItem("token");

export function PreviewTodos() {
  const [todoList, setTodoList] = useState([]);

  const previewTodos = () => {
    axios
      .get("http://localhost:3000/api/v1/todo/preview", {
        headers: { token: token },
      })
      .then((response) => {
        // console.log(response.data.todos);
        setTodoList(response.data.todos);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.error("No todos found for this user.");
        } else {
          console.error("Error fetching todos:", err);
        }
      });
  };

  useEffect(() => {
    previewTodos();
  }, []);

  const markTodoCompleted = (id) => {
    axios
      .put(
        "http://localhost:3000/api/v1/todo/complete",
        { id },
        {
          headers: { token: token },
        }
      )
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
      .delete(`http://localhost:3000/api/v1/todo/deleteTodo/${id}`, {
        headers: { token: token },
      })
      .then(() => {
        setTodoList((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <div
            key={todo._id}
            className={`relative p-6 rounded-lg shadow-md  ${
              todo.completed
                ? "bg-gradient-to-r from-teal-200 to-teal-300 border-teal-400"
                : "bg-white"
            } border`}
          >
            <h1 className="text-2xl font-bold text-gray-800">{todo.title}</h1>
            <h2 className="mb-4 text-lg text-gray-700">{todo.description}</h2>
            <strong className="pb-1 text-sm text-gray-600">
              Added on: {new Date(todo.createdAt).toLocaleString()}
            </strong>
            <div className="flex items-center justify-between">
              <button
                onClick={() => markTodoCompleted(todo._id)}
                className={`py-2 px-4 rounded w-full text-center font-semibold ${
                  todo.completed
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-orange-400 text-white hover:bg-orange-500"
                }`}
                disabled={todo.completed}
              >
                {todo.completed ? (
                  <BsFillCheckCircleFill className="inline-block" />
                ) : (
                  <IoCheckmark className="inline-block" />
                )}
              </button>
              <button
                className="absolute px-2 py-1 font-bold text-white bg-purple-600 rounded-full cursor-pointer top-2 right-2 hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                onClick={() => deleteTodo(todo._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))
      ) : (
        <strong className="p-4 text-center text-gray-800 bg-purple-300 rounded-lg shadow-md">
          No todos available <IoAddCircleOutline className="inline-block" />
        </strong>
      )}
    </div>
  );
}

export default PreviewTodos;
