import React from 'react';

function Task({ task, completeTask, deleteTask }) {
  const { id, title, description, dueDate, priority, completed } = task;

  return (
    <li class="task-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Priority: {priority}</p>
      <p>Completed: {completed ? 'Yes' : 'No'}</p>
      <button onClick={() => completeTask(id)}>Complete</button>
      <button onClick={() => deleteTask(id)}>Delete</button>
    </li>
  );
}

export default Task;
