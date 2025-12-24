import React from 'react';
import { Calendar, Clock, Tag, Edit2, Trash2, AlertCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { deleteTask, setEditingTask, setShowAddTask, updateTask } = useTaskContext();

  const priorityConfig = {
    high: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      label: 'Alta'
    },
    medium: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      label: 'Media'
    },
    low: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      label: 'Bassa'
    }
  };

  const handleEdit = () => {
    setEditingTask(task);
    setShowAddTask(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Sei sicuro di voler eliminare "${task.title}"?`)) {
      deleteTask(task.id);
    }
  };

  const handleQuickStatusChange = () => {
    const statusFlow = {
      'todo': 'in-progress',
      'in-progress': 'done',
      'done': 'todo'
    };
    updateTask(task.id, { status: statusFlow[task.status] });
  };

  const isOverdue = () => {
    if (!task.dueDate || task.status === 'done') return false;
    return new Date(task.dueDate) < new Date();
  };

  const priority = priorityConfig[task.priority];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all group">
      {/* Header con priorità */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
            {task.title}
          </h3>
          {isOverdue() && (
            <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
              <AlertCircle className="w-3 h-3" />
              <span className="font-medium">In ritardo</span>
            </div>
          )}
        </div>
        <span className={`${priority.bg} ${priority.text} ${priority.border} text-xs px-3 py-1 rounded-full border font-semibold`}>
          {priority.label}
        </span>
      </div>
      
      {/* Descrizione */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {task.description || 'Nessuna descrizione'}
      </p>
      
      {/* Categoria */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 font-medium">
          <Tag className="w-3 h-3" />
          {task.category}
        </span>
      </div>
      
      {/* Info riga */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{task.estimatedHours}h</span>
        </div>
        <div className={`flex items-center gap-1 ${isOverdue() ? 'text-red-600 font-semibold' : ''}`}>
          <Calendar className="w-4 h-4" />
          <span>{task.dueDate}</span>
        </div>
      </div>
      
      {/* Azioni */}
      <div className="flex gap-2">
        <button
          onClick={handleQuickStatusChange}
          className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
        >
          {task.status === 'todo' && 'Inizia'}
          {task.status === 'in-progress' && 'Completa'}
          {task.status === 'done' && 'Riapri'}
        </button>
        <button
          onClick={handleEdit}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Modifica task"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
          title="Elimina task"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;