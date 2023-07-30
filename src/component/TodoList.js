import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo to the list
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      // If the todo text is empty or contains only whitespaces, return without adding it
      return;
    }

    // Create a new array with the new todo added at the beginning
    const newTodos = [todo, ...todos];

    // Update the todos state with the new array
    setTodos(newTodos);

    // Log the current todos (this log won't show the updated state immediately)
    console.log(...todos);
  };

  // Function to update an existing todo
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      // If the new value is empty or contains only whitespaces, return without updating
      return;
    }

    // Map through the todos array and replace the todo with matching id with the new value
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  // Function to remove a todo from the list
  const removeTodo = (id) => {
    // Create a new array by filtering out the todo with the matching id
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    // Update the todos state with the new array (removing the todo)
    setTodos(removedArr);
  };

  // Function to mark a todo as completed or incomplete
  const completeTodo = (id) => {
    // Map through the todos array and toggle the 'isComplete' property of the matching todo
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });

    // Update the todos state with the modified array
    setTodos(updatedTodos);
  };

  return (
    <>
      {/* Title */}
      <h1>What's the Plan for Today?</h1>

      {/* Form to add new todos */}
      <TodoForm onSubmit={addTodo} />

      {/* Component to display the list of todos */}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
