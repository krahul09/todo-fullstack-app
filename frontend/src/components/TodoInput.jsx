import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const addNewTodo = async (todo) => {
  const response = await axios.post("http://localhost:5000/api/todos", todo);
  return response.data;
};

const TodoInput = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation(addNewTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      text,
      completed: false,
    });
    setText("");
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete("http://localhost:5000/api/todos/all");
      queryClient.invalidateQueries("todos");
      console.log("Deleted all todos");
    } catch (error) {
      console.error("Error deleting all todos:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex justify-between items-center"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border p-2 w-full"
        placeholder="Add a new task"
      />
      <button type="submit" className="ml-2 p-2 bg-blue-500 text-white">
        Add Task
      </button>
      <button
        type="button"
        onClick={handleDeleteAll}
        className="ml-2 p-2 bg-red-500 text-white"
      >
        Delete All
      </button>
    </form>
  );
};

export default TodoInput;
