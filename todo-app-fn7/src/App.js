import React, { useState } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import PriorityRenderer from './components/PriorityRenderer.js';
import DateRenderer from './components/DateRendere.js';
import { JsonForms } from '@jsonforms/react';

const jsonSchema = {
  type: 'object',
  properties: {
    tasks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            title: 'ID',
          },
          title: {
            type: 'string',
            title: 'Title',
          },
          description: {
            type: 'string',
            title: 'Description',
          },
          dueDate: {
            type: 'string',
            format: 'date',
            title: 'Due Date',
          },
          priority: {
            type: 'string',
            title: 'Priority',
            enum: ['low', 'medium', 'high'],
          },
          completed: {
            type: 'string',
            title: 'Completed',
            enum: ['Yes', 'No'],
          },
        },
        required: ['title', 'priority'],
      },
    },
  },
};

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Title',
          scope: '#/properties/tasks/items/properties/title',
        },
        {
          type: 'Control',
          label: 'Description',
          scope: '#/properties/tasks/items/properties/description',
        },
      ],
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          label: 'Due Date',
          scope: '#/properties/tasks/items/properties/dueDate',
        },
        {
          type: 'Control',
          label: 'Priority',
          scope: '#/properties/tasks/items/properties/priority',
        },
        {
          type: 'Control',
          label: 'Completed',
          scope: '#/properties/tasks/items/properties/completed',
        },
      ],
    },
  ],
};

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "task1",
      description: "test desc",
      dueDate: "02-03-2022",
      priority: "low",
      completed: "No",
    },
  ]);

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

  return (
    <div className="App">
      <h1>Todo Application</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} />
      <JsonForms
        data={tasks}
        schema={jsonSchema}
        uischema={uiSchema}
        renderers={{
          ...JsonForms.defaultRenderers,
          'Control': PriorityRenderer,
          'Control': DateRenderer,
        }}
      />
    </div>
  );
};

export default App;
