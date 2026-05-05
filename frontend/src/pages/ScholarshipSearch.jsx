import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Search, DollarSign, MapPin, Calendar, Filter, X, ChevronDown, Award, ExternalLink } from 'lucide-react';

const ScholarshipSearch = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    stream: '',
    location: '',
    deadlineFrom: '',
    deadlineTo: ''
  });

  useEffect(() => {
    fetchScholarships();
  }, [user]);

  const fetchScholarships = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/scholarships`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setScholarships(data);
    } catch (err) {
      console.error(err);
    }
  };

  const allStreams = useMemo(() => {
    const streams = new Set();
    scholarships.forEach(s => s.eligibleStreams?.forEach(st => streams.add(st)));
    return [...streams].sort();
  }, [scholarships]);

  const allLocations = useMemo(() => {
    const locs = new Set();
    scholarships.forEach(s => s.eligibleLocations?.forEach(l => locs.add(l)));
    return [...locs].sort();
  }, [scholarships]);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter(sch => {
      const matchesSearch = !searchQuery || 
        sch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sch.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesMinAmount = !filters.minAmount || sch.amount >= Number(filters.minAmount);
      const matchesMaxAmount = !filters.maxAmount || sch.amount <= Number(filters.maxAmount);
      const matchesStream = !filters.stream || sch.eligibleStreams?.includes(filters.stream);
      const matchesLocation = !filters.location || sch.eligibleLocations?.includes(filters.location) || sch.eligibleLocations?.length === 0;
      const matchesDeadlineFrom = !filters.deadlineFrom || new Date(sch.deadline) >= new Date(filters.deadlineFrom);
      const matchesDeadlineTo = !filters.deadlineTo || new Date(sch.deadline) <= new Date(filters.deadlineTo);

      return matchesSearch && matchesMinAmount && matchesMaxAmount && matchesStream && matchesLocation && matchesDeadlineFrom && matchesDeadlineTo;
    });
  }, [scholarships, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({ minAmount: '', maxAmount: '', stream: '', location: '', deadlineFrom: '', deadlineTo: '' });
    setSearchQuery('');
  };

  const hasActiveFilters = searchQuery || filters.minAmount || filters.maxAmount || filters.stream || filters.location || filters.deadlineFrom || filters.deadlineTo;

  const getDaysLeft = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><Search className="text-brand-500"/> Scholarship Search</h1>
        <p className="text-gray-600 mt-1">Find and filter scholarships that match your profile</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              placeholder="Search by title, provider, or keywords..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg font-medium transition ${
              showFilters || hasActiveFilters ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter size={18}/> Filters {hasActiveFilters && <span className="w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">{Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0)}</span>}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><DollarSign size={14} className="inline mr-1"/> Min Amount</label>
                <input type="number" value={filters.minAmount} onChange={e => handleFilterChange('minAmount', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><DollarSign size={14} className="inline mr-1"/> Max Amount</label>
                <input type="number" value={filters.maxAmount} onChange={e => handleFilterChange('maxAmount', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400" placeholder="Any" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><Award size={14} className="inline mr-1"/> Stream</label>
                <select value={filters.stream} onChange={e => handleFilterChange('stream', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400">
                  <option value="">All Streams</option>
                  {allStreams.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><MapPin size={14} className="inline mr-1"/> Location</label>
                <select value={filters.location} onChange={e => handleFilterChange('location', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400">
                  <option value="">All Locations</option>
                  {allLocations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><Calendar size={14} className="inline mr-1"/> Deadline From</label>
                <input type="date" value={filters.deadlineFrom} onChange={e => handleFilterChange('deadlineFrom', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1"><Calendar size={14} className="inline mr-1"/> Deadline To</label>
                <input type="date" value={filters.deadlineTo} onChange={e => handleFilterChange('deadlineTo', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400" />
              </div>
            </div>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition">
                <X size={14}/> Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">{filteredScholarships.length} scholarship{filteredScholarships.length !== 1 ? 's' : ''} found</p>
      </div>

      {filteredScholarships.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScholarships.map(sch => {
            const daysLeft = getDaysLeft(sch.deadline);
            return (
              <div key={sch._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-bold">
                    ${sch.amount.toLocaleString()}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    daysLeft < 0 ? 'bg-red-100 text-red-700' :
                    daysLeft <= 30 ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {daysLeft < 0 ? 'Expired' : `${daysLeft} days left`}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{sch.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{sch.description}</p>
                <p className="text-sm text-gray-500 mb-3"><strong>Provider:</strong> {sch.provider}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sch.eligibleStreams?.slice(0, 3).map(s => (
                    <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                  ))}
                  {sch.eligibleStreams?.length > 3 && <span className="text-xs text-gray-400">+{sch.eligibleStreams.length - 3}</span>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14}/> {new Date(sch.deadline).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><MapPin size={14}/> {sch.eligibleLocations?.slice(0, 1).join(', ') || 'Global'}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No scholarships match your filters</p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="mt-3 text-brand-600 hover:text-brand-700 font-medium text-sm">Clear all filters</button>
          )}
        </div>
      )}
    </div>
  );
};

export default ScholarshipSearch;
