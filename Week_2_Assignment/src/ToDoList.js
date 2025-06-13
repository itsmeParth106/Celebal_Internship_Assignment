
import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return alert('Please enter a valid task');
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    return sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text);
  });

  return (
    <div className="todo-wrapper">
      <div className="task-input">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add your task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="controls">
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={() => setSortAsc(!sortAsc)}>
          Sort: {sortAsc ? 'A-Z' : 'Z-A'}
        </button>
      </div>

      <ul className="task-list">
        {sortedTasks.map(task => (
          <li key={task.id} className={task.completed ? 'done' : ''}>
            <span onClick={() => toggleComplete(task.id)}>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
