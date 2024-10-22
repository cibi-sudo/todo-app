import { useState } from "react";
import axios from "axios";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="flex items-center justify-center w-full min-h-screen transition-transform transform bg-gradient-to-r from-blue-500 to-pink-500">
      <div className="p-8 bg-white rounded shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Create a Todo</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
        <button
          onClick={() => {
            axios
              .post("http://localhost:3000/api/v1/todo/create", {
                title,
                description,
              })
              .then(() => {
                setTitle("");
                setDescription("");
              })
              .catch((err) => {
                console.error(err);
                alert("ERROR");
              });
          }}
          className="px-4 py-2 font-bold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:shadow-outline"
        >
          Add a Todo
        </button>
      </div>
    </div>
  );
}
