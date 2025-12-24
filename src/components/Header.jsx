import React from 'react';
import { CheckSquare, Plus, Layout, List, BarChart3, Calendar as CalendarIcon } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const Header = () => {
  const { view, setView, setShowAddTask, tasks } = useTaskContext();

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  const views = [
    { id: 'kanban', label: 'Kanban', icon: Layout },
    { id: 'list', label: 'Lista', icon: List },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'calendar', label: 'Calendario', icon: CalendarIcon }
  ];

  return (
    <>
      <div className="bg-white shadow-sm border-b border-gray-200 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <CheckSquare className="w-8 h-8 text-blue-600" />
                Task Manager
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Organizza e gestisci i tuoi progetti in modo efficiente
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Nuovo Task</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
                  view === id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view !== 'dashboard' && view !== 'calendar' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: 'Totale', 
                value: stats.total, 
                color: 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700',
                icon: <CheckSquare className="w-5 h-5" />
              },
              { 
                label: 'Da Fare', 
                value: stats.todo, 
                color: 'bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-700',
                icon: <Layout className="w-5 h-5" />
              },
              { 
                label: 'In Corso', 
                value: stats.inProgress, 
                color: 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700',
                icon: <BarChart3 className="w-5 h-5" />
              },
              { 
                label: 'Completati', 
                value: stats.done, 
                color: 'bg-gradient-to-br from-green-100 to-green-200 text-green-700',
                icon: <CheckSquare className="w-5 h-5" />
              }
            ].map(stat => (
              <div key={stat.label} className={`${stat.color} p-4 rounded-lg shadow-sm transition-transform hover:scale-105`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium opacity-80">{stat.label}</div>
                  <div className="opacity-50">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;