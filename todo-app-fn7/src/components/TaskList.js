import React from 'react';
import Task from './Task';

function TaskList({ tasks, completeTask, deleteTask }) {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <Task key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
