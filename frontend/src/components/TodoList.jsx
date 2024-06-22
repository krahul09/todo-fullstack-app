import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TodoItem from "./TodoItem";

const fetchTodos = async () => {
  const response = await axios.get("http://localhost:5000/api/todos");
  return response.data;
};

const TodoList = () => {
  const { data: todos, status, error } = useQuery("todos", fetchTodos);

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "success") {
    content = todos.map((todo) => <TodoItem key={todo._id} todo={todo} />);
  } else if (status === "error") {
    content = <p>{error.message}</p>;
  }

  return <div>{content}</div>;
};

export default TodoList;
