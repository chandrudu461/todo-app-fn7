import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState({
    id: Date.now(), // Initialize with a default ID
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      id: Date.now(), // Generate a new ID for the next task
      title: '',
      description: '',
      dueDate: '',
      priority: '',
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        placeholder="Task Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        value={task.description}
        placeholder="Task Description"
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange} required>
        <option value="">Select Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
