import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newSch, setNewSch] = useState({ title: '', description: '', provider: '', amount: 0, deadline: '' });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [schRes, appRes] = await Promise.all([
        axios.get(`${API_URL}/api/scholarships`, { headers: { Authorization: `Bearer ${user.token}` } }),
        axios.get(`${API_URL}/api/applications`, { headers: { Authorization: `Bearer ${user.token}` } })
      ]);
      setScholarships(schRes.data);
      setApplications(appRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/scholarships`, newSch, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
      setNewSch({ title: '', description: '', provider: '', amount: 0, deadline: '' });
    } catch (err) {
      alert('Error creating scholarship');
    }
  };

  const updateAppStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/api/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchData();
    } catch (err) {
      alert('Error updating status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Post New Scholarship</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500" placeholder="Title" required value={newSch.title} onChange={e => setNewSch({...newSch, title: e.target.value})} />
            <textarea className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 resize-none h-24" placeholder="Description" required value={newSch.description} onChange={e => setNewSch({...newSch, description: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500" placeholder="Provider" required value={newSch.provider} onChange={e => setNewSch({...newSch, provider: e.target.value})} />
              <input type="number" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500" placeholder="Amount ($)" required value={newSch.amount} onChange={e => setNewSch({...newSch, amount: e.target.value})} />
            </div>
            <input type="date" className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500" required value={newSch.deadline} onChange={e => setNewSch({...newSch, deadline: e.target.value})} />
            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-6 rounded-lg transition">Create Scholarship</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Review Applications</h2>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {applications.map(app => (
              <div key={app._id} className="p-4 border border-gray-100 rounded-lg">
                <p className="font-bold">{app.user?.name} <span className="font-normal text-sm text-gray-500">applied for</span> {app.scholarship?.title}</p>
                <p className="text-sm text-gray-500 mb-3">Status: <span className="font-bold">{app.status}</span></p>
                <div className="flex gap-2">
                  <button onClick={() => updateAppStatus(app._id, 'Accepted')} className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-md text-sm font-medium transition">Accept</button>
                  <button onClick={() => updateAppStatus(app._id, 'Rejected')} className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md text-sm font-medium transition">Reject</button>
                </div>
              </div>
            ))}
            {applications.length === 0 && <p className="text-gray-500">No applications to review.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
