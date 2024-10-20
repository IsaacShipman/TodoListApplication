import React, { useState } from 'react';

const TodoList = ({ tasks, addTask, removeTask, completeTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const task = {
      id: Date.now().toString(),  // Optionally, you can use Firebase ID after adding to the database
      name: newTask,
      completed: false,
      category: '' // Initially no category
    };

    addTask(task);
    setNewTask('');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <form onSubmit={handleAddTask} className="mb-4">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
            placeholder="Add a new task" 
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
      </form>

      {/* Task List */}
      <ul className="list-group">
        {tasks.map(task => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            draggable
            onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
          >
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', fontSize: "1.5rem" }}>
              {task.name}
            </span>
            <div className="ml-auto">
              <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm me-2">Delete</button>
              <button onClick={() => completeTask(task.id)} className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-secondary'}`}>
                {task.completed ? 'Completed' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
