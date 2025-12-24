import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const AddTaskModal = () => {
  const { addTask, setShowAddTask, generateAISuggestions } = useTaskContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    category: '',
    estimatedHours: 0
  });
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const handleAISuggest = async () => {
    if (formData.description) {
      const suggestions = await generateAISuggestions(formData.description);
      setAiSuggestions(suggestions);
      setFormData(prev => ({
        ...prev,
        estimatedHours: suggestions.estimatedHours,
        category: suggestions.suggestedCategory
      }));
    }
  };

  const handleSubmit = () => {
    if (formData.title) {
      addTask(formData);
      setShowAddTask(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Crea Nuovo Task</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titolo</label>
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
              <button
                onClick={handleAISuggest}
                className="mt-2 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                <Sparkles className="w-4 h-4" />
                Genera suggerimenti AI
              </button>
            </div>

            {aiSuggestions && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suggerimenti AI
                </h3>
                <div className="text-sm text-purple-800">
                  <p className="mb-2">Subtask consigliati:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {aiSuggestions.subtasks.map((subtask, i) => (
                      <li key={i}>{subtask}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
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
                />
              </div>

              <div>
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
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Crea Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
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