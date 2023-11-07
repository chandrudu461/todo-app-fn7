import React from 'react';
import Task from './Task';
import './TaskList.css';

// function TaskList({ tasks, completeTask, deleteTask }) {
//   return (
//     <div>
//       <h1>List of tasks</h1>
//       <ul>
//         {tasks.map((task) => (
//           <Task key={task.id} task={task} completeTask={completeTask} deleteTask={deleteTask} />
//         ))}
//       </ul>
//     </div>
//   );
// }

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
