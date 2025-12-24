import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const AddTaskModal = () => {
  const { addTask, updateTask, setShowAddTask, editingTask, setEditingTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    category: '',
    estimatedHours: 0
  });

  useEffect(() => {
    if (editingTask) {
      setFormData(editingTask);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (formData.title) {
      if (editingTask) {
        updateTask(editingTask.id, formData);
      } else {
        addTask(formData);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setShowAddTask(false);
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      category: '',
      estimatedHours: 0
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingTask ? 'Modifica Task' : 'Crea Nuovo Task'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titolo *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Es: Implementare API REST"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descrizione</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                placeholder="Descrivi il task in dettaglio..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stato</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="todo">Da Fare</option>
                  <option value="in-progress">In Corso</option>
                  <option value="done">Completato</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priorità</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Bassa</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Es: Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ore stimate</label>
                <input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Scadenza</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!formData.title}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editingTask ? 'Salva Modifiche' : 'Crea Task'}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;