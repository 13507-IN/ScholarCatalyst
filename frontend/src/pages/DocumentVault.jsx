import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FolderOpen, Upload, Trash2, FileText, Award, Mail, Shield, File, Link as LinkIcon, Plus, X } from 'lucide-react';

const DOCUMENT_TYPES = [
  { value: 'transcript', label: 'Transcript', icon: FileText, color: 'text-blue-500' },
  { value: 'recommendation_letter', label: 'Recommendation Letter', icon: Mail, color: 'text-purple-500' },
  { value: 'certificate', label: 'Certificate', icon: Award, color: 'text-green-500' },
  { value: 'id_proof', label: 'ID Proof', icon: Shield, color: 'text-amber-500' },
  { value: 'essay', label: 'Essay / SOP', icon: File, color: 'text-pink-500' },
  { value: 'other', label: 'Other', icon: FileText, color: 'text-gray-500' }
];

const DocumentVault = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    type: 'transcript',
    fileUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  const fetchDocuments = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/documents`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setDocuments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.fileUrl) {
      alert('Please fill in the document name and URL');
      return;
    }
    setUploading(true);
    try {
      await axios.post(`${API_URL}/api/documents`, formData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setFormData({ name: '', type: 'transcript', fileUrl: '', description: '' });
      setShowUpload(false);
      fetchDocuments();
    } catch (err) {
      alert('Failed to upload document');
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this document?')) return;
    try {
      await axios.delete(`${API_URL}/api/documents/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchDocuments();
    } catch (err) {
      alert('Failed to delete document');
    }
  };

  const filteredDocs = filterType === 'all' ? documents : documents.filter(d => d.type === filterType);

  const getTypeInfo = (type) => DOCUMENT_TYPES.find(t => t.value === type) || DOCUMENT_TYPES[5];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><FolderOpen className="text-brand-500"/> Document Vault</h1>
          <p className="text-gray-600 mt-1">Store and manage your scholarship documents</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          {showUpload ? <X size={18}/> : <Plus size={18}/>} {showUpload ? 'Cancel' : 'Add Document'}
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload size={20} className="text-brand-500"/> Upload Document</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                  placeholder="e.g., Official Transcript 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                >
                  {DOCUMENT_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1"><LinkIcon size={14} className="inline mr-1"/> File URL (Google Drive, Dropbox, etc.)</label>
              <input
                type="url"
                value={formData.fileUrl}
                onChange={e => setFormData({ ...formData, fileUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                placeholder="https://drive.google.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 h-16 resize-none"
                placeholder="Brief description of this document..."
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2 rounded-lg transition disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
            filterType === 'all' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({documents.length})
        </button>
        {DOCUMENT_TYPES.map(t => {
          const count = documents.filter(d => d.type === t.value).length;
          if (count === 0) return null;
          return (
            <button
              key={t.value}
              onClick={() => setFilterType(t.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                filterType === t.value ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {filteredDocs.length > 0 ? filteredDocs.map(doc => {
          const typeInfo = getTypeInfo(doc.type);
          const TypeIcon = typeInfo.icon;
          return (
            <div key={doc._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 transition flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-50 ${typeInfo.color}`}>
                <TypeIcon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-gray-500">{typeInfo.label} • Added {new Date(doc.createdAt).toLocaleDateString()}</div>
                {doc.description && <div className="text-sm text-gray-400 mt-1 truncate">{doc.description}</div>}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:text-brand-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-brand-50 transition"
                >
                  Open
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-16">
            <FolderOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No documents yet</p>
            <p className="text-gray-400 text-sm mt-1">Upload transcripts, certificates, and recommendation letters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentVault;
