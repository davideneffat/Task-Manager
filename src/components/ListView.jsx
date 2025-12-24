import React from 'react';
import { Calendar, Clock, Tag, Edit2, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const ListView = () => {
  const { tasks, deleteTask, setEditingTask, setShowAddTask, updateTask } = useTaskContext();

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

  const statusLabels = {
    'todo': 'Da Fare',
    'in-progress': 'In Corso',
    'done': 'Completato'
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priorità
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scadenza
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ore
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Azioni
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  Nessun task disponibile. Crea il tuo primo task!
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                      <Tag className="w-3 h-3" />
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                      {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Bassa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full border-0 ${statusColors[task.status]} cursor-pointer focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="todo">Da Fare</option>
                      <option value="in-progress">In Corso</option>
                      <option value="done">Completato</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {task.dueDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {task.estimatedHours}h
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Modifica task"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Sei sicuro di voler eliminare questo task?')) {
                            deleteTask(task.id);
                          }
                        }}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Elimina task"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
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
  );
};

export default ListView;