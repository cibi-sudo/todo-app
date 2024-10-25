import { FiLogOut } from "react-icons/fi";

const CreateTodo = ({
  todoData,
  handleInputChange,
  submitTodo,
  handleLogout,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-500 to-pink-500">
      <button
        onClick={handleLogout}
        className="absolute px-4 py-2 font-bold text-white bg-red-500 rounded top-4 right-4 hover:bg-red-600 focus:outline-none focus:shadow-outline"
      >
        <FiLogOut />
      </button>
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
        <div className="flex space-x-4">
          <button
            onClick={submitTodo}
            className="px-4 py-2 font-bold text-white bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:shadow-outline"
          >
            Add a Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;
