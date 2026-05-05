import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap, Menu, X, User, Calendar, Kanban, FolderOpen, Video, Search, Star } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-600 font-bold text-xl">
          <GraduationCap size={28} />
          <span>ScholarCatalyst</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/community" className="text-gray-600 hover:text-brand-600 font-medium transition">Community</Link>
          {user && (
            <>
              <Link to="/search" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><Search size={16}/> Search</Link>
              <Link to="/stories" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><Star size={16}/> Stories</Link>
            </>
          )}
          {user && user.role === 'student' && (
            <>
              <Link to="/student-dashboard" className="text-gray-600 hover:text-brand-600 font-medium transition">Dashboard</Link>
              <Link to="/profile" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><User size={16}/> Profile</Link>
              <Link to="/calendar" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><Calendar size={16}/> Calendar</Link>
              <Link to="/tracker" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><Kanban size={16}/> Tracker</Link>
              <Link to="/documents" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><FolderOpen size={16}/> Docs</Link>
              <Link to="/interview" className="text-gray-600 hover:text-brand-600 font-medium transition flex items-center gap-1"><Video size={16}/> Interview</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin-dashboard" className="text-gray-600 hover:text-brand-600 font-medium transition">Admin Panel</Link>
          )}
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-brand-600 font-medium transition">Login</Link>
              <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg font-medium shadow-md shadow-brand-500/20 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 space-y-3">
          <Link to="/community" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2">Community</Link>
          {user && (
            <>
              <Link to="/search" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><Search size={16}/> Scholarship Search</Link>
              <Link to="/stories" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><Star size={16}/> Success Stories</Link>
            </>
          )}
          {user && user.role === 'student' && (
            <>
              <Link to="/student-dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2">Dashboard</Link>
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><User size={16}/> Profile</Link>
              <Link to="/calendar" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><Calendar size={16}/> Calendar</Link>
              <Link to="/tracker" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><Kanban size={16}/> Tracker</Link>
              <Link to="/documents" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><FolderOpen size={16}/> Documents</Link>
              <Link to="/interview" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2 flex items-center gap-2"><Video size={16}/> Interview Prep</Link>
            </>
          )}
          {user && user.role === 'admin' && (
            <Link to="/admin-dashboard" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2">Admin Panel</Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="w-full text-left text-gray-700 font-medium py-2">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-gray-600 hover:text-brand-600 font-medium py-2">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="block bg-brand-600 text-white text-center px-5 py-2 rounded-lg font-medium">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
