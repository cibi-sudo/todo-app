import { useEffect, useState } from "react";
import axios from "axios";
import PreviewTodos from "../components/todoActions";

const token = localStorage.getItem("token");

const Todos = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const submitTodo = () => {
    axios
      .post("http://localhost:3000/api/v1/todo/create", todoData, {
        headers: {
          token: token,
        },
      })
      .then(() => {
        // console.log("Todo added");
        setTodoData({ title: "", description: "" });
      })
      .catch((err) => {
        console.error("Error while adding todo:", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-500 to-pink-500">
      <div className="p-8 mb-8 bg-white rounded shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Create a Todo</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={todoData.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={todoData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={submitTodo}
          className="px-4 py-2 font-bold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:shadow-outline"
        >
          Add a Todo
        </button>
      </div>
      <PreviewTodos></PreviewTodos>
    </div>
  );
};

export default Todos;
