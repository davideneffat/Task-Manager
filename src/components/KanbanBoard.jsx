import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';

const KanbanBoard = () => {
  const { tasks } = useTaskContext();

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-50' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'done', title: 'Done', color: 'bg-green-50' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map(column => (
        <div key={column.id} className={`${column.color} p-4 rounded-lg`}>
          <h2 className="font-bold text-lg mb-4 flex items-center justify-between">
            {column.title}
            <span className="text-sm font-normal text-gray-500">
              {tasks.filter(t => t.status === column.id).length}
            </span>
          </h2>
          <div className="space-y-3">
            {tasks
              .filter(task => task.status === column.id)
              .map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;