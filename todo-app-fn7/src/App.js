import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { JsonForms } from '@jsonforms/react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const taskSchema = {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      dueDate: { type: "string", format: "date" },
      priority: { type: "string", enum: ["Low", "Medium", "High"] },
    },
  };

  const taskUISchema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", label: "Title", scope: "#/properties/title" },
      { type: "Control", label: "Description", scope: "#/properties/description" },
      { type: "Control", label: "Due Date", scope: "#/properties/dueDate" },
      { type: "Control", label: "Priority", scope: "#/properties/priority" },
    ],
  };

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddTask = (index) => {
    setTasks([...tasks, newTask]);
    setNewTask({});
  }

  const handleEditTask = (index) => {
    setEditingTask(index);
    setEditedTask({ ...tasks[index] });
  };

  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingTask] = editedTask;
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTask(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Todo Application</h1>
      {/* normal implementation  */}
      {/* <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />  */}


      {/*using jsonforms */}
      <div className="tasks">
        <JsonForms
          data={newTask}
          uischema={taskUISchema}
          schema={taskSchema}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data }) => setNewTask(data)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <div className="task-cards" >
        {tasks.map((task, index) => (
          <div key={index} className="task-card" 
          style={{
            backgroundColor:
              task.priority.toLowerCase() === "low"
                ? "#90EE90" // Green for low priority
                : task.priority.toLowerCase() === "medium"
                ? "#FFD580" // Orange for medium priority
                : task.priority.toLowerCase() === "high"
                ? "#FFCCCB" 
                : "inherit" 
          }}
          >
            {editingTask === index ? (
              <div>
                <JsonForms
                  data={editedTask}
                  uischema={taskUISchema}
                  schema={taskSchema}
                  renderers={materialRenderers}
                  cells={materialCells}
                  onChange={({ data }) => setEditedTask(data)}
                />
                <button onClick={handleUpdateTask}>Update</button>
              </div>
            ) : (
              <>

                <div className="task-details">
                  <div >Title:<br></br><div className="task-title">{task.title}</div><br></br></div>
                  <div>Description: <br></br><div className="task-description" >{task.description}</div> <br></br></div>
                  <div>Due Data:<br></br><div className="task-duedate"> {task.dueDate} </div><br></br></div>
                  <div >Priority:<br></br> <div className="task-priority">{task.priority}</div> <br></br></div>
                </div>

                <button onClick={() => handleEditTask(index)}>Edit</button>
                <button onClick={() => handleDeleteTask(index)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default App;