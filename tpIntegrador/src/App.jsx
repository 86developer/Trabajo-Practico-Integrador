import React, { useState, useEffect } from 'react';
//import './app.css';

// Componente de Tarea
const TaskItem = ({ task, onComplete }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleComplete = () => {
    setCompleted(!completed);
    onComplete(task.id, !completed);
  };

  return (
    <div>
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{task.name}</span>
      <button onClick={handleComplete}>{completed ? 'Done' : 'Complete'}</button>
    </div>
  );
};

// Componente de Lista de Tareas
const TaskList = ({ tasks, onTaskComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onTaskComplete} />
      ))}
    </div>
  );
};

// Componente de Formulario
const TaskForm = ({ onTaskAdd }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() !== '') {
      onTaskAdd(taskName);
      setTaskName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Agregar tarea"
      />
      <button className='button' type="submit">Agregar</button>
    </form>
  );
};

// Componente Principal
const TodoApp = () => {
  const [tasks, setTasks] = useState([]);

  // Función para agregar tareas
  const handleTaskAdd = (name) => {
    const newTask = { id: tasks.length + 1, name, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Función para marcar tarea como completada
  const handleTaskComplete = (id, completed) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    // Ejemplo de efecto secundario
    console.log('Tasks updated:', tasks);
  }, [tasks]);

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onTaskAdd={handleTaskAdd} />
      <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
};

export default App;
