import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Kanban as KanbanIcon, Clock, CheckCircle, XCircle, Send, DollarSign, Calendar } from 'lucide-react';

const COLUMNS = [
  { id: 'Draft', label: 'Draft', icon: Clock, color: 'bg-gray-100 border-gray-200 text-gray-700' },
  { id: 'Applied', label: 'Applied', icon: Send, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'Pending', label: 'Under Review', icon: Clock, color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'Accepted', label: 'Accepted', icon: CheckCircle, color: 'bg-green-50 border-green-200 text-green-700' },
  { id: 'Rejected', label: 'Rejected', icon: XCircle, color: 'bg-red-50 border-red-200 text-red-700' }
];

const ApplicationTracker = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [draggedApp, setDraggedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/applications/my`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragStart = (appId) => {
    setDraggedApp(appId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (newStatus) => {
    if (!draggedApp) return;
    try {
      await axios.put(`${API_URL}/api/applications/${draggedApp}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setApplications(prev => prev.map(app => app._id === draggedApp ? { ...app, status: newStatus } : app));
    } catch (err) {
      alert('Failed to update status');
    }
    setDraggedApp(null);
  };

  const getAppsByStatus = (status) => applications.filter(app => app.status === status);

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><KanbanIcon className="text-brand-500"/> Application Tracker</h1>
        <p className="text-gray-600 mt-1">Drag and drop cards to update application status</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {COLUMNS.map(col => {
          const apps = getAppsByStatus(col.id);
          const Icon = col.icon;
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
              className="flex-shrink-0 w-72 bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg ${col.color} border`}>
                <Icon size={18} />
                <span className="font-bold">{col.label}</span>
                <span className="ml-auto text-sm opacity-70">{apps.length}</span>
              </div>

              <div className="space-y-3 min-h-[200px]">
                {apps.length > 0 ? apps.map(app => (
                  <div
                    key={app._id}
                    draggable
                    onDragStart={() => handleDragStart(app._id)}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition hover:border-brand-200"
                  >
                    <div className="font-medium text-sm mb-2">{app.scholarship?.title}</div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center gap-1"><DollarSign size={12}/> ${app.scholarship?.amount}</div>
                      <div className="flex items-center gap-1"><Calendar size={12}/> {new Date(app.createdAt).toLocaleDateString()}</div>
                    </div>
                    {app.sopText && app.sopText !== 'Standard SOP submitted' && (
                      <div className="mt-2 pt-2 border-t border-gray-50">
                        <div className="text-xs text-gray-400">Custom SOP submitted</div>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400 text-sm">No applications</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTracker;
