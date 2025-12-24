import React, { useState, useEffect } from 'react';
import { X, Save, Plus, AlertCircle, Sparkles } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const AddTaskModal = () => {
  const { addTask, updateTask, setShowAddTask, editingTask, setEditingTask, getCategories } = useTaskContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(1);
  
  const [errors, setErrors] = useState({});

  const categories = getCategories();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      setCategory(editingTask.category);
      setEstimatedHours(editingTask.estimatedHours);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [editingTask]);

  const validate = () => {
    const newErrors = {};
    
    if (!title.trim()) {
      newErrors.title = 'Il titolo è obbligatorio';
    }
    
    if (!category.trim()) {
      newErrors.category = 'La categoria è obbligatoria';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'La scadenza è obbligatoria';
    }
    
    if (estimatedHours <= 0) {
      newErrors.estimatedHours = 'Le ore devono essere maggiori di 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate,
      category,
      estimatedHours: parseInt(estimatedHours)
    };
    
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    handleClose();
  };

  const handleClose = () => {
    setShowAddTask(false);
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setStatus('todo');
    setPriority('medium');
    setDueDate('');
    setCategory('');
    setEstimatedHours(1);
    setErrors({});
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              {editingTask ? (
                <Save className="w-6 h-6 text-white" />
              ) : (
                <Sparkles className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {editingTask ? 'Modifica Task' : 'Crea Nuovo Task'}
              </h2>
              <p className="text-sm text-blue-100 mt-0.5">
                {editingTask ? 'Aggiorna le informazioni del task' : 'Compila i dettagli per il nuovo task'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Chiudi (Esc)"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-220px)] p-6 space-y-5">
          {/* Titolo */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Titolo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Es: Implementare sistema di autenticazione JWT"
              autoFocus
            />
            {errors.title && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          {/* Descrizione */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Descrizione
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none transition-all"
              placeholder="Descrivi il task in dettaglio (opzionale)..."
            />
          </div>

          {/* Griglia 2 colonne */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Stato <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="todo">📋 Da Fare</option>
                <option value="in-progress">🔄 In Corso</option>
                <option value="done">✅ Completato</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Priorità <span className="text-red-500">*</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="low">🟢 Bassa</option>
                <option value="medium">🟡 Media</option>
                <option value="high">🔴 Alta</option>
              </select>
            </div>
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Categoria <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              list="categories"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Es: Development, Design, Marketing..."
            />
            <datalist id="categories">
              {categories.map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
            {errors.category && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.category}</span>
              </div>
            )}
          </div>

          {/* Griglia ore e data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Ore stimate <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.estimatedHours ? 'border-red-500' : 'border-gray-300'
                }`}
                min="0"
                step="0.5"
              />
              {errors.estimatedHours && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.estimatedHours}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Scadenza <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.dueDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.dueDate && (
                <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.dueDate}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t-2 border-gray-200 px-6 py-4">
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl"
            >
              {editingTask ? (
                <>
                  <Save className="w-5 h-5" />
                  Salva Modifiche
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Crea Task
                </>
              )}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-colors font-semibold"
            >
              Annulla
            </button>
          </div>
          
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm">Esc</kbd>
              <span>Chiudi</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded shadow-sm">Enter</kbd>
              <span>Salva</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;