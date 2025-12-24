import React, { useState } from 'react';
import { Calendar, Clock, Tag, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import SearchAndFilters from './SearchAndFilters';

const ListView = () => {
  const { getFilteredTasks, deleteTask, setEditingTask, setShowAddTask, updateTask } = useTaskContext();
  const tasks = getFilteredTasks();
  const [sortField, setSortField] = useState('dueDate');
  const [sortDirection, setSortDirection] = useState('asc');

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'done': 'bg-green-100 text-green-800'
  };

  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'priority') {
      aValue = priorityOrder[a.priority];
      bValue = priorityOrder[b.priority];
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 opacity-30" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <SearchAndFilters />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Task
                    <SortIcon field="title" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Categoria
                    <SortIcon field="category" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('priority')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Priorità
                    <SortIcon field="priority" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Stato
                    <SortIcon field="status" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('dueDate')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Scadenza
                    <SortIcon field="dueDate" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('estimatedHours')}
                    className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors"
                  >
                    Ore
                    <SortIcon field="estimatedHours" />
                  </button>
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-semibold mb-2">Nessun task trovato</p>
                      <p className="text-sm">Prova a modificare i filtri di ricerca</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedTasks.map((task, index) => (
                  <tr 
                    key={task.id} 
                    className={`hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-semibold text-gray-900 mb-1">
                          {task.title}
                        </div>
                        <div className="text-sm text-gray-600 line-clamp-2">
                          {task.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-medium">
                        <Tag className="w-3 h-3" />
                        {task.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${priorityColors[task.priority]}`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Bassa'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className={`text-xs px-3 py-1 rounded-full border-0 font-medium ${statusColors[task.status]} cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all`}
                      >
                        <option value="todo">Da Fare</option>
                        <option value="in-progress">In Corso</option>
                        <option value="done">Completato</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{task.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{task.estimatedHours}h</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors group"
                          title="Modifica task"
                        >
                          <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Sei sicuro di voler eliminare questo task?')) {
                              deleteTask(task.id);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors group"
                          title="Elimina task"
                        >
                          <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;