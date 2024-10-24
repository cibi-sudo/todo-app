import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CreateTodo from "../components/CreateTodo";
import PreviewTodo from "../components/PreviewTodo";

const token = localStorage.getItem("token");

const Todos = () => {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  });

  const [todoList, setTodoList] = useState([]);
  const [isTodoAdded, setIsTodoAdded] = useState(false);
  const newTodoRef = useRef(null);

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
        setIsTodoAdded(true);
      })
      .catch((err) => {
        console.error("Error while adding todo:", err);
      });
  };

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
  }, [todoData]);

  useEffect(() => {
    if (isTodoAdded && newTodoRef.current) {
      newTodoRef.current.scrollIntoView({ behavior: "smooth" });
      setIsTodoAdded(false);
    }
  }, [todoList, isTodoAdded]);

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
    <div>
      <CreateTodo
        todoData={todoData}
        handleInputChange={handleInputChange}
        submitTodo={submitTodo}
      />
      <PreviewTodo
        todoList={todoList}
        markTodoCompleted={markTodoCompleted}
        deleteTodo={deleteTodo}
        newTodoRef={newTodoRef}
      />
    </div>
  );
};

export default Todos;
