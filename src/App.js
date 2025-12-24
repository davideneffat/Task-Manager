import React from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import AddTaskModal from './components/AddTaskModal';

const AppContent = () => {
  const { view, showAddTask } = useTaskContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4">
        {view === 'kanban' && <KanbanBoard />}
        {view === 'list' && <ListView />}
      </div>

      {showAddTask && <AddTaskModal />}
    </div>
  );
};

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;