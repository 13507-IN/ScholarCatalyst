import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertCircle, DollarSign, MapPin } from 'lucide-react';

const DeadlineCalendar = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [scholarships, setScholarships] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const scholarshipsByDate = useMemo(() => {
    const map = {};
    scholarships.forEach(sch => {
      const dateKey = new Date(sch.deadline).toISOString().split('T')[0];
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(sch);
    });
    return map;
  }, [scholarships]);

  const upcomingDeadlines = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return scholarships
      .filter(s => new Date(s.deadline) >= today)
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 10);
  }, [scholarships]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasDeadline = (date) => {
    if (!date) return false;
    const key = date.toISOString().split('T')[0];
    return scholarshipsByDate[key]?.length > 0;
  };

  const getSelectedScholarships = () => {
    if (!selectedDate) return [];
    const key = selectedDate.toISOString().split('T')[0];
    return scholarshipsByDate[key] || [];
  };

  const getUrgencyColor = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) return 'bg-red-500';
    if (daysLeft <= 30) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getDaysLeft = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><CalendarIcon className="text-brand-500"/> Deadline Calendar</h1>
        <p className="text-gray-600 mt-1">Track upcoming scholarship deadlines at a glance</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition"><ChevronLeft size={20}/></button>
              <h2 className="text-xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition"><ChevronRight size={20}/></button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, i) => (
                <button
                  key={i}
                  onClick={() => date && setSelectedDate(date)}
                  disabled={!date}
                  className={`
                    relative h-12 rounded-lg text-sm font-medium transition
                    ${!date ? 'invisible' : ''}
                    ${isToday(date) ? 'bg-brand-100 text-brand-700 font-bold' : ''}
                    ${isSelected(date) ? 'ring-2 ring-brand-500' : ''}
                    ${!isToday(date) && !isSelected(date) ? 'hover:bg-gray-50' : ''}
                  `}
                >
                  {date?.getDate()}
                  {hasDeadline(date) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Selected Date Details */}
            {selectedDate && getSelectedScholarships().length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-bold mb-3">Deadlines on {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <div className="space-y-3">
                  {getSelectedScholarships().map(sch => (
                    <div key={sch._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getUrgencyColor(sch.deadline)}`}></div>
                      <div className="flex-1">
                        <div className="font-medium">{sch.title}</div>
                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><DollarSign size={14}/> ${sch.amount}</span>
                          <span className="flex items-center gap-1"><MapPin size={14}/> {sch.provider}</span>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-amber-600">{getDaysLeft(sch.deadline)} days left</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines Sidebar */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><AlertCircle className="text-red-500"/> Upcoming Deadlines</h2>
            <div className="space-y-3">
              {upcomingDeadlines.length > 0 ? upcomingDeadlines.map(sch => {
                const daysLeft = getDaysLeft(sch.deadline);
                return (
                  <div key={sch._id} className="p-3 border border-gray-100 rounded-lg hover:border-brand-200 transition">
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm">{sch.title}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full text-white font-bold ${
                        daysLeft <= 7 ? 'bg-red-500' : daysLeft <= 30 ? 'bg-amber-500' : 'bg-green-500'
                      }`}>
                        {daysLeft}d
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                      <span className="flex items-center gap-1"><DollarSign size={12}/> ${sch.amount}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {new Date(sch.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              }) : (
                <p className="text-gray-500 text-sm">No upcoming deadlines</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeadlineCalendar;
