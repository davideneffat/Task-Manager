import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTaskContext } from '../context/TaskContext';
import { Clock, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { tasks } = useTaskContext();

  // Dati per grafico stati
  const statusData = [
    { name: 'Da Fare', value: tasks.filter(t => t.status === 'todo').length, color: '#FCD34D' },
    { name: 'In Corso', value: tasks.filter(t => t.status === 'in-progress').length, color: '#60A5FA' },
    { name: 'Completati', value: tasks.filter(t => t.status === 'done').length, color: '#34D399' }
  ];

  // Dati per grafico priorità
  const priorityData = [
    { name: 'Alta', value: tasks.filter(t => t.priority === 'high').length, color: '#EF4444' },
    { name: 'Media', value: tasks.filter(t => t.priority === 'medium').length, color: '#F59E0B' },
    { name: 'Bassa', value: tasks.filter(t => t.priority === 'low').length, color: '#10B981' }
  ];

  // Dati per grafico ore per categoria
  const categoryHours = {};
  tasks.forEach(task => {
    if (task.category) {
      categoryHours[task.category] = (categoryHours[task.category] || 0) + task.estimatedHours;
    }
  });

  const categoryData = Object.entries(categoryHours).map(([name, hours]) => ({
    name,
    ore: hours
  }));

  // Statistiche
  const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
  const completedHours = tasks.filter(t => t.status === 'done').reduce((sum, task) => sum + task.estimatedHours, 0);
  const completionRate = tasks.length > 0 ? ((tasks.filter(t => t.status === 'done').length / tasks.length) * 100).toFixed(1) : 0;

  // Task in scadenza (prossimi 3 giorni)
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'done') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  });

  return (
    <div className="space-y-6">
      {/* Statistiche principali */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ore Totali</p>
              <p className="text-3xl font-bold text-gray-900">{totalHours}h</p>
            </div>
            <Clock className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ore Completate</p>
              <p className="text-3xl font-bold text-green-600">{completedHours}h</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasso Completamento</p>
              <p className="text-3xl font-bold text-blue-600">{completionRate}%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Scadenza</p>
              <p className="text-3xl font-bold text-orange-600">{upcomingTasks.length}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-orange-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Grafici */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafico Stati */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Distribuzione per Stato</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Grafico Priorità */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Distribuzione per Priorità</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grafico Ore per Categoria */}
      {categoryData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Ore Stimate per Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="ore" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Task in scadenza */}
      {upcomingTasks.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Task in Scadenza (prossimi 3 giorni)
          </h3>
          <div className="space-y-2">
            {upcomingTasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-semibold text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-orange-600">{task.dueDate}</p>
                  <p className="text-xs text-gray-500">{task.estimatedHours}h stimate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;