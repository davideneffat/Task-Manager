import React, { useState } from 'react';
import { Calendar, Clock, Tag, Edit2, Trash2 } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
          <Tag className="w-3 h-3" />
          {task.category}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {task.estimatedHours}h
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {task.dueDate}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;