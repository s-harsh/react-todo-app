import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  // State to manage the input value, set it to the value of props.edit if it exists
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  // Ref to hold a reference to the input element
  const inputRef = useRef(null);

  // useEffect hook to focus the input element when the component mounts or updates
  useEffect(() => {
    inputRef.current.focus(); // Focus the input element after the component has been rendered
  });

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setInput(e.target.value); // Update the input state with the new value
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Call the onSubmit function from props with the new todo object
    props.onSubmit({
      id: Math.floor(Math.random() * 10000), // Generate a random ID for the new todo
      text: input, // Use the current input value as the text of the new todo
    });

    setInput(""); // Clear the input field after form submission
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {/* Conditional rendering based on whether it's an edit or a new todo */}
      {props.edit ? (
        <>
          {/* Input field for updating todo */}
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          {/* Button to submit the update */}
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          {/* Input field for adding new todo */}
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          {/* Button to submit the new todo */}
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
