import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import SearchAndFilters from './SearchAndFilters';
import { AlertCircle } from 'lucide-react';

const KanbanBoard = () => {
  const { getFilteredTasks } = useTaskContext();
  const tasks = getFilteredTasks();

  const columns = [
    { 
      id: 'todo', 
      title: 'Da Fare', 
      color: 'bg-gradient-to-b from-gray-50 to-gray-100',
      borderColor: 'border-gray-300',
      headerColor: 'text-gray-700'
    },
    { 
      id: 'in-progress', 
      title: 'In Corso', 
      color: 'bg-gradient-to-b from-blue-50 to-blue-100',
      borderColor: 'border-blue-300',
      headerColor: 'text-blue-700'
    },
    { 
      id: 'done', 
      title: 'Completato', 
      color: 'bg-gradient-to-b from-green-50 to-green-100',
      borderColor: 'border-green-300',
      headerColor: 'text-green-700'
    }
  ];

  return (
    <div className="space-y-6">
      <SearchAndFilters />
      
      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900">
            Nessun task trovato
          </h3>
          <p className="text-gray-600">
            Prova a modificare i filtri o crea un nuovo task per iniziare
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => {
            const columnTasks = tasks.filter(task => task.status === column.id);
            
            return (
              <div 
                key={column.id} 
                className={`${column.color} p-4 rounded-lg border-2 ${column.borderColor} transition-all min-h-[500px]`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-gray-200">
                  <h2 className={`font-bold text-lg ${column.headerColor}`}>
                    {column.title}
                  </h2>
                  <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-white ${column.headerColor} shadow-sm`}>
                    {columnTasks.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      Nessun task in questa colonna
                    </div>
                  ) : (
                    columnTasks.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;