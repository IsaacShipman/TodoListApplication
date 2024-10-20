import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Import your Firebase config
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');

  // Fetch tasks from Firebase
  const fetchTasks = async () => {
    const tasksCollection = collection(db, 'tasks');
    const taskSnapshot = await getDocs(tasksCollection);
    const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(taskList);
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on component mount
  }, []);

  // Add a new task
  const addTask = async () => {
    if (!newTaskName) return; // Prevent adding empty tasks
    try {
      const taskDoc = await addDoc(collection(db, 'tasks'), { name: newTaskName, completed: false });
      setTasks(prevTasks => [...prevTasks, { id: taskDoc.id, name: newTaskName, completed: false }]);
      setNewTaskName(''); // Clear input after adding
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Remove a task
  const removeTask = async (id) => {
    try {
      const taskRef = doc(db, 'tasks', id); // Use the Firestore document ID
      await deleteDoc(taskRef);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id)); // Update local state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark a task as completed
  const completeTask = async (id) => {
    const task = tasks.find(task => task.id === id);
    const taskRef = doc(db, 'tasks', id);
    await setDoc(taskRef, { completed: !task.completed }, { merge: true });

    // Update local state after the database operation
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            value={newTaskName} 
            onChange={(e) => setNewTaskName(e.target.value)} 
            placeholder="Add a new task" 
          />
          <button onClick={addTask} className="btn btn-primary">Add</button>
        </div>
      </header>

      <div className="container mt-4">
        <h2>Tasks</h2>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-item d-flex justify-content-between align-items-center mb-2">
              <span className={`task-name ${task.completed ? 'completed' : ''}`}>{task.name}</span>
              <div>
                <button onClick={() => removeTask(task.id)} className="btn btn-danger btn-sm me-2">Delete</button>
                <button onClick={() => completeTask(task.id)} className={`btn btn-sm ${task.completed ? 'btn-success' : 'btn-secondary'}`}>
                  {task.completed ? 'Completed' : 'Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
