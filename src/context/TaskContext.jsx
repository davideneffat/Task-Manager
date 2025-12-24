import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Implementare autenticazione',
      description: 'Creare sistema di login con JWT',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-12-30',
      category: 'Development',
      estimatedHours: 8
    },
    {
      id: '2',
      title: 'Design dashboard',
      description: 'Creare mockup dashboard principale',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-12-25',
      category: 'Design',
      estimatedHours: 4
    },
    {
      id: '3',
      title: 'Setup CI/CD',
      description: 'Configurare GitHub Actions',
      status: 'done',
      priority: 'low',
      dueDate: '2024-12-20',
      category: 'DevOps',
      estimatedHours: 3
    }
  ]);

  const [view, setView] = useState('kanban');
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const generateAISuggestions = async (taskDescription) => {
    // Placeholder per integrazione AI
    return {
      subtasks: [
        'Ricerca e analisi requisiti',
        'Implementazione base',
        'Testing e validazione',
        'Documentazione'
      ],
      estimatedHours: Math.floor(Math.random() * 10) + 2,
      suggestedCategory: 'Development'
    };
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      view,
      setView,
      showAddTask,
      setShowAddTask,
      generateAISuggestions
    }}>
      {children}
    </TaskContext.Provider>
  );
};