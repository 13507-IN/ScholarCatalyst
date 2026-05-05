import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Community from './pages/Community';
import ProfileBuilder from './pages/ProfileBuilder';
import DeadlineCalendar from './pages/DeadlineCalendar';
import ApplicationTracker from './pages/ApplicationTracker';
import DocumentVault from './pages/DocumentVault';
import InterviewPrep from './pages/InterviewPrep';
import ScholarshipSearch from './pages/ScholarshipSearch';
import SuccessStories from './pages/SuccessStories';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/community" element={<Community />} />
            <Route 
              path="/student-dashboard" 
              element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/admin-dashboard" 
              element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/profile" 
              element={<ProtectedRoute role="student"><ProfileBuilder /></ProtectedRoute>} 
            />
            <Route 
              path="/calendar" 
              element={<ProtectedRoute role="student"><DeadlineCalendar /></ProtectedRoute>} 
            />
            <Route 
              path="/tracker" 
              element={<ProtectedRoute role="student"><ApplicationTracker /></ProtectedRoute>} 
            />
            <Route 
              path="/documents" 
              element={<ProtectedRoute role="student"><DocumentVault /></ProtectedRoute>} 
            />
            <Route 
              path="/interview" 
              element={<ProtectedRoute role="student"><InterviewPrep /></ProtectedRoute>} 
            />
            <Route 
              path="/search" 
              element={<ProtectedRoute role="student"><ScholarshipSearch /></ProtectedRoute>} 
            />
            <Route 
              path="/stories" 
              element={<SuccessStories />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
