import React from 'react';
import { CheckSquare, Plus, Layout, List } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const Header = () => {
  const { view, setView, setShowAddTask, tasks } = useTaskContext();

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  return (
    <>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <CheckSquare className="w-8 h-8 text-blue-600" />
                Task Manager
              </h1>
              <p className="text-gray-600 text-sm mt-1">Organizza e gestisci i tuoi progetti</p>
            </div>
            
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Nuovo Task
            </button>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                view === 'kanban' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Layout className="w-4 h-4" />
              Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                view === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
              Lista
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Totale', value: stats.total, color: 'bg-gray-100 text-gray-700' },
            { label: 'Da Fare', value: stats.todo, color: 'bg-yellow-100 text-yellow-700' },
            { label: 'In Corso', value: stats.inProgress, color: 'bg-blue-100 text-blue-700' },
            { label: 'Completati', value: stats.done, color: 'bg-green-100 text-green-700' }
          ].map(stat => (
            <div key={stat.label} className={`${stat.color} p-4 rounded-lg`}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;