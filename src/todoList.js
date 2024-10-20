import React, { useState } from 'react';

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const addTodo = () => {
      if (inputValue.trim()) {
        const newTodo = { text: inputValue, completed: false };
        setTodos([...todos, newTodo]);
        setInputValue('');
      }
    };
  
    const toggleComplete = (index) => {
      const updatedTodos = [...todos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      setTodos(updatedTodos);
    };
  
    const deleteTodo = (index) => {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodos(updatedTodos);
    };
  
    return (
      <div>
        <h1>To-Do List</h1>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              <button onClick={() => toggleComplete(index)}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  

export default ToDoList;