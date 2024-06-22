import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DarkModeToggle from "./components/DarkModeToggle";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-6xl font-bold">Todo List</h1>
          </div>
          <DarkModeToggle />
        </div>
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
