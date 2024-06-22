import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const updateTodo = async (todo) => {
  const response = await axios.patch(
    `http://localhost:5000/api/todos/${todo._id}`,
    todo
  );
  return response.data;
};

const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:5000/api/todos/${id}`);
  return id;
};

const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleToggle = () => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleRemove = () => {
    deleteMutation.mutate(todo._id);
    console.log("Todo deleted");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate({
      ...todo,
      text,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 border-b">
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-1"
        />
      ) : (
        <span className={todo.completed ? "line-through" : ""}>
          {todo.text}
        </span>
      )}
      <div className="flex space-x-2">
        {isEditing ? (
          <button onClick={handleSave} className="p-1 bg-green-500 text-white">
            Save
          </button>
        ) : (
          <button onClick={handleEdit} className="p-1 bg-yellow-500 text-white">
            Edit
          </button>
        )}
        <button onClick={handleRemove} className="p-1 bg-red-500 text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
