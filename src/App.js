import React, { useEffect } from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import AddTaskModal from './components/AddTaskModal';
import { Loader2 } from 'lucide-react';

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
      <p className="text-gray-600 font-medium">Caricamento Task Manager...</p>
    </div>
  </div>
);

const EmptyState = ({ view, onCreateTask }) => {
  const emptyStates = {
    kanban: {
      title: 'Nessun task da visualizzare',
      description: 'Inizia creando il tuo primo task per organizzare il lavoro',
      emoji: '📋'
    },
    list: {
      title: 'La lista è vuota',
      description: 'Crea un nuovo task per iniziare a gestire i tuoi progetti',
      emoji: '📝'
    },
    dashboard: {
      title: 'Nessun dato disponibile',
      description: 'Aggiungi task per visualizzare statistiche e grafici',
      emoji: '📊'
    },
    calendar: {
      title: 'Nessuna scadenza programmata',
      description: 'Crea task con scadenze per vederli nel calendario',
      emoji: '📅'
    }
  };

  const state = emptyStates[view] || emptyStates.kanban;

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6 animate-bounce">{state.emoji}</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {state.title}
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          {state.description}
        </p>
        <button
          onClick={onCreateTask}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Crea il tuo primo task
        </button>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { view, showAddTask, tasks, setShowAddTask } = useTaskContext();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showAddTask) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAddTask]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const hasNoTasks = tasks.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {hasNoTasks && !showAddTask ? (
          <EmptyState view={view} onCreateTask={() => setShowAddTask(true)} />
        ) : (
          <>
            {view === 'kanban' && <KanbanBoard />}
            {view === 'list' && <ListView />}
            {view === 'dashboard' && <Dashboard />}
            {view === 'calendar' && <Calendar />}
          </>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                Task Manager - Organizza i tuoi progetti in modo efficiente
              </p>
              <p className="text-gray-500 text-xs mt-1">
                © 2024 Task Manager. Creato con React e Tailwind CSS
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                {tasks.length} task totali
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {tasks.filter(t => t.status === 'done').length} completati
              </span>
            </div>
          </div>
        </div>
      </footer>

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