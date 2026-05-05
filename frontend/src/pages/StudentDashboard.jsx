import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, MapPin, DollarSign, Award, Send, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const StudentDashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [sopResult, setSopResult] = useState('');
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchRecommendations();
    fetchApplications();
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/scholarships/recommendations/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    }
  };

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

  const applyForScholarship = async (id) => {
    try {
      await axios.post(`${API_URL}/api/applications`, {
        scholarshipId: id,
        sopText: 'Standard SOP submitted',
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert('Applied successfully!');
      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying');
    }
  };

  const handleGenerateSop = async () => {
    setGenerating(true);
    setCopied(false);
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/generate-sop`, { prompt }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSopResult(data.generatedText);
    } catch (err) {
      alert('Failed to generate SOP');
    }
    setGenerating(false);
  };

  const handleCopySop = () => {
    navigator.clipboard.writeText(sopResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
          <p className="text-gray-600">Here are your personalized opportunities</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Award className="text-brand-500"/> Recommended for You</h2>
            <div className="space-y-4">
              {recommendations.length > 0 ? recommendations.map((item) => (
                <div key={item.scholarship._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.scholarship.title}</h3>
                      <p className="text-gray-600 mb-4">{item.scholarship.description}</p>
                      <div className="flex gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><DollarSign size={16}/> ${item.scholarship.amount}</span>
                        <span className="flex items-center gap-1"><MapPin size={16}/> {item.scholarship.provider}</span>
                      </div>
                    </div>
                    <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-200">
                      {item.score}% Match
                    </div>
                  </div>
                  <button 
                    onClick={() => applyForScholarship(item.scholarship._id)}
                    className="bg-brand-50 hover:bg-brand-100 text-brand-700 font-medium px-4 py-2 rounded-lg transition w-full"
                  >
                    1-Click Apply
                  </button>
                </div>
              )) : <p className="text-gray-500">No recommendations found yet. Complete your profile to get matches.</p>}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-100">
                  <tr>
                    <th className="p-4 font-medium">Scholarship</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app._id} className="border-b border-gray-50">
                      <td className="p-4 font-medium">{app.scholarship?.title}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr><td colSpan="3" className="p-4 text-center text-gray-500">No applications yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BookOpen className="text-purple-500"/> AI SOP Generator</h2>
            <p className="text-sm text-gray-600 mb-4">Describe your achievements and the scholarship you're applying for, and our AI will draft an essay.</p>
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-lg text-sm mb-4 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 h-32 resize-none"
              placeholder="E.g., I am a computer science student with a 3.8 GPA applying for the Women in Tech scholarship..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
            <button 
              onClick={handleGenerateSop}
              disabled={generating || !prompt}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {generating ? 'Generating...' : <><Send size={16} /> Generate Draft</>}
            </button>
            {sopResult && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-gray-700">Generated SOP</h3>
                  <button
                    onClick={handleCopySop}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600 transition"
                  >
                    {copied ? <><Check size={14} className="text-green-500"/> Copied!</> : <><Copy size={14}/> Copy</>}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 max-h-96 overflow-y-auto p-5 prose prose-sm prose-purple max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold text-gray-900 mb-3 mt-0" {...props}/>,
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold text-gray-900 mb-2 mt-5 first:mt-0" {...props}/>,
                      h3: ({node, ...props}) => <h3 className="text-base font-semibold text-gray-800 mb-1 mt-4" {...props}/>,
                      p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-3" {...props}/>,
                      ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props}/>,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props}/>,
                      li: ({node, ...props}) => <li className="text-gray-700" {...props}/>,
                      strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props}/>,
                      em: ({node, ...props}) => <em className="italic text-gray-800" {...props}/>,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-purple-300 pl-4 italic text-gray-600 my-3" {...props}/>,
                    }}
                  >
                    {sopResult}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
