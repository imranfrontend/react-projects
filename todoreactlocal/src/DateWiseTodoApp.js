import React, { useState, useEffect } from 'react';

const DatewiseTodoApp = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(getDateKey(date))) || {};
    setTasks(storedTasks);
  }, [date]);

  const getDateKey = (date) => {
    return date.toISOString().split('T')[0]; // Use date as key in local storage
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTaskId = Date.now();
      const newTask = { id: newTaskId, text: inputValue, completed: false };
      const newTasks = { ...tasks, [newTaskId]: newTask };
      setTasks(newTasks);
      localStorage.setItem(getDateKey(date), JSON.stringify(newTasks));
      setInputValue('');
    }
  };

  const handleEditTask = (id, newText) => {
    const updatedTasks = { ...tasks, [id]: { ...tasks[id], text: newText } };
    setTasks(updatedTasks);
    localStorage.setItem(getDateKey(date), JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id) => {
    const { [id]: deletedTask, ...remainingTasks } = tasks;
    setTasks(remainingTasks);
    localStorage.setItem(getDateKey(date), JSON.stringify(remainingTasks));
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = { ...tasks, [id]: { ...tasks[id], completed: !tasks[id].completed } };
    setTasks(updatedTasks);
    localStorage.setItem(getDateKey(date), JSON.stringify(updatedTasks));
  };

  const handleNextDay = () => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    setIsDisabled(true);
    if(nextDay <= new Date()) {
        setDate(nextDay);
        setIsDisabled(false);
    }
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1);
    setDate(previousDay);
    setIsDisabled(false);
  };

  return (
    <div>
      <h1>Datewise Todo App</h1>
      <h2>{date.toDateString()}</h2>
      <input
        type="text"
        placeholder="Enter task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handlePreviousDay}>Previous Day</button>
      <button disabled={isDisabled} onClick={handleNextDay}>Next Day</button>
      <ul>
        {Object.values(tasks).map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button onClick={() => handleEditTask(task.id, prompt('Enter new task name', task.text))}>
              Edit
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DatewiseTodoApp;
