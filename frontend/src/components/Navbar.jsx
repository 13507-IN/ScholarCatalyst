import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-600 font-bold text-xl">
          <GraduationCap size={28} />
          <span>ScholarCatalyst</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/community" className="text-gray-600 hover:text-brand-600 font-medium transition">Community</Link>
          {user ? (
            <>
              {user.role === 'student' && <Link to="/student-dashboard" className="text-gray-600 hover:text-brand-600 font-medium transition">Dashboard</Link>}
              {user.role === 'admin' && <Link to="/admin-dashboard" className="text-gray-600 hover:text-brand-600 font-medium transition">Admin Panel</Link>}
              <button 
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-brand-600 font-medium transition">Login</Link>
              <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-lg font-medium shadow-md shadow-brand-500/20 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
