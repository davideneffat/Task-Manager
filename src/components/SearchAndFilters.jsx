import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

const SearchAndFilters = () => {
  const { searchQuery, setSearchQuery, filters, setFilters, getCategories } = useTaskContext();
  const categories = getCategories();

  const hasActiveFilters = filters.priority !== 'all' || filters.category !== 'all' || filters.status !== 'all' || searchQuery;

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({
      priority: 'all',
      category: 'all',
      status: 'all'
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cerca task..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tutti gli stati</option>
              <option value="todo">Da Fare</option>
              <option value="in-progress">In Corso</option>
              <option value="done">Completato</option>
            </select>
          </div>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tutte le priorità</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Bassa</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tutte le categorie</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Pulisci
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;