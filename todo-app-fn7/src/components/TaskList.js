import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, completeTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask}/>
        </li>
      ))}
    </ul>
  );
};


export default TaskList;
