
import React, { useState, useEffect } from 'react';
const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(()=>{
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    const handleAddTask = () => {
        if(inputValue.trim() !== '') {
            const newTask = {id: Date.now(), text: inputValue, completed: false};
            const newTasks = [...tasks, newTask];
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            setInputValue('');
        }
    }

    const handleEditTask = (id, newText) => {
        const updatedTasks = tasks.map(task =>
            task.id == id ? { ...task, text: newText } : task    
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleCompleteTask = (id) => {
        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    return (
        <div>
            <h1>Todo App</h1>
            <input type="text" placeholder="Enter task" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
            <button onClick={handleAddTask}>Add Task</button>
            <br />
            <ul>
                {
                    tasks.map(task => (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.completed} onChange={() => handleCompleteTask(task.id)} />
                            <span style={{textDecoration: task.completed ? 'line-through' : 'none'}}>{task.text}</span>
                            {' '}
                            <button onClick={() => handleEditTask(task.id, prompt('Enter new task name', task.text))}>Edit</button>
                            { ' ' }
                            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoApp;