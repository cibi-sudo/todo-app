import { MdDelete } from "react-icons/md";
import { IoCheckmark, IoAddCircleOutline } from "react-icons/io5";
import { BsFillCheckCircleFill } from "react-icons/bs";

const previewTodo = ({
  todoList,
  markTodoCompleted,
  deleteTodo,
  newTodoRef,
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gradient-to-r from-blue-500 to-pink-500">
      {todoList.length > 0 ? (
        todoList.map((todo, index) => (
          <div
            key={todo._id}
            ref={index === todoList.length - 1 ? newTodoRef : null}
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
};

export default previewTodo;
