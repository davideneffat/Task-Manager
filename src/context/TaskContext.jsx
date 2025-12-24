import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTaskContext must be used within TaskProvider');
  return context;
};

export const TaskProvider = ({ children }) => {
  // Task
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [
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
      ];
    } catch (error) {
      console.error('Errore caricamento tasks:', error);
      return [];
    }
  });

  const [view, setView] = useState(() => {
    return localStorage.getItem('view') || 'kanban';
  });

  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    status: 'all'
  });

  // Salva tasks
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Salva view
  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesCategory = filters.category === 'all' || task.category === filters.category;
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      
      return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
    });
  };

  const getCategories = () => {
    return [...new Set(tasks.map(task => task.category))].filter(Boolean);
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
      editingTask,
      setEditingTask,
      searchQuery,
      setSearchQuery,
      filters,
      setFilters,
      getFilteredTasks,
      getCategories
    }}>
      {children}
    </TaskContext.Provider>
  );
};