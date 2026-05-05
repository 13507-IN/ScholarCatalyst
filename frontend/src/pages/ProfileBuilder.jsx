import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, GraduationCap, BookOpen, MapPin, Target, Trophy, Languages, Briefcase, DollarSign, Phone, Building, Calendar, Link as LinkIcon, Save, CheckCircle } from 'lucide-react';

const ProfileBuilder = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user, setUser } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    schoolOrCollege: '',
    phoneNumber: '',
    academicMarks: '',
    familyIncome: '',
    stream: '',
    location: '',
    country: '',
    city: '',
    dateOfBirth: '',
    gender: '',
    currentEducationLevel: '',
    yearOfStudy: '',
    extracurriculars: '',
    achievements: '',
    languages: '',
    careerGoals: '',
    financialNeedStatement: '',
    linkedinUrl: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || '',
        schoolOrCollege: user?.schoolOrCollege || '',
        phoneNumber: user?.phoneNumber || '',
        academicMarks: user?.academicMarks || '',
        familyIncome: user?.familyIncome || '',
        stream: user?.stream || '',
        location: user?.location || '',
        country: user?.country || '',
        city: user?.city || '',
        dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user?.gender || '',
        currentEducationLevel: user?.currentEducationLevel || '',
        yearOfStudy: user?.yearOfStudy || '',
        extracurriculars: Array.isArray(user?.extracurriculars) ? user.extracurriculars.join(', ') : user?.extracurriculars || '',
        achievements: Array.isArray(user?.achievements) ? user.achievements.join(', ') : user?.achievements || '',
        languages: Array.isArray(user?.languages) ? user.languages.join(', ') : user?.languages || '',
        careerGoals: user?.careerGoals || '',
        financialNeedStatement: user?.financialNeedStatement || '',
        linkedinUrl: user?.linkedinUrl || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const payload = {
      ...formData,
      academicMarks: parseFloat(formData.academicMarks) || 0,
      familyIncome: parseFloat(formData.familyIncome) || 0,
      extracurriculars: formData.extracurriculars.split(',').map(s => s.trim()).filter(Boolean),
      achievements: formData.achievements.split(',').map(s => s.trim()).filter(Boolean),
      languages: formData.languages.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      const { data } = await axios.put(`${API_URL}/api/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Failed to save profile');
    }
    setSaving(false);
  };

  const profileComplete = user?.profileComplete || 0;

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><User className="text-brand-500"/> Profile Builder</h1>
          <p className="text-gray-600 mt-1">Complete your profile to get better scholarship matches</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-brand-600">{profileComplete}%</div>
          <div className="text-sm text-gray-500">Profile Complete</div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div className="bg-brand-500 h-2 rounded-full transition-all duration-500" style={{ width: `${profileComplete}%` }}></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><User size={20} className="text-brand-500"/> Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={user?.email || ''} disabled className={`${inputClass} bg-gray-50`} />
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className={labelClass}><Phone size={14} className="inline mr-1"/> Phone</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}><LinkIcon size={14} className="inline mr-1"/> LinkedIn URL</label>
              <input type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><GraduationCap size={20} className="text-brand-500"/> Academic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>School / College</label>
              <input type="text" name="schoolOrCollege" value={formData.schoolOrCollege} onChange={handleChange} className={inputClass} placeholder="e.g., MIT, Stanford" />
            </div>
            <div>
              <label className={labelClass}><Building size={14} className="inline mr-1"/> Stream / Major</label>
              <input type="text" name="stream" value={formData.stream} onChange={handleChange} className={inputClass} placeholder="e.g., Computer Science" />
            </div>
            <div>
              <label className={labelClass}>Education Level</label>
              <select name="currentEducationLevel" value={formData.currentEducationLevel} onChange={handleChange} className={inputClass}>
                <option value="">Select</option>
                <option value="high-school">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
                <option value="postdoc">Postdoctoral</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Year of Study</label>
              <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleChange} className={inputClass}>
                <option value="">Select</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="final">Final Year</option>
              </select>
            </div>
            <div>
              <label className={labelClass}><BookOpen size={14} className="inline mr-1"/> Academic Score (GPA/%)</label>
              <input type="number" step="0.01" name="academicMarks" value={formData.academicMarks} onChange={handleChange} className={inputClass} placeholder="e.g., 3.8 or 92" />
            </div>
            <div>
              <label className={labelClass}><DollarSign size={14} className="inline mr-1"/> Family Income (USD)</label>
              <input type="number" name="familyIncome" value={formData.familyIncome} onChange={handleChange} className={inputClass} placeholder="e.g., 25000" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><MapPin size={20} className="text-brand-500"/> Location</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Preferred Study Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="e.g., USA, Europe" />
            </div>
          </div>
        </div>

        {/* Achievements & Extracurriculars */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy size={20} className="text-brand-500"/> Achievements & Extracurriculars</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Extracurriculars (comma separated)</label>
              <textarea name="extracurriculars" value={formData.extracurriculars} onChange={handleChange} className={`${inputClass} h-20 resize-none`} placeholder="e.g., Debate Club, Robotics Team, Volunteer Work" />
            </div>
            <div>
              <label className={labelClass}>Achievements & Awards (comma separated)</label>
              <textarea name="achievements" value={formData.achievements} onChange={handleChange} className={`${inputClass} h-20 resize-none`} placeholder="e.g., National Science Olympiad Winner, Dean's List" />
            </div>
            <div>
              <label className={labelClass}><Languages size={14} className="inline mr-1"/> Languages (comma separated)</label>
              <input type="text" name="languages" value={formData.languages} onChange={handleChange} className={inputClass} placeholder="e.g., English, Spanish, Hindi" />
            </div>
          </div>
        </div>

        {/* Goals & Financial Need */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Target size={20} className="text-brand-500"/> Goals & Financial Need</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Career Goals</label>
              <textarea name="careerGoals" value={formData.careerGoals} onChange={handleChange} className={`${inputClass} h-24 resize-none`} placeholder="Describe your career aspirations..." />
            </div>
            <div>
              <label className={labelClass}>Financial Need Statement</label>
              <textarea name="financialNeedStatement" value={formData.financialNeedStatement} onChange={handleChange} className={`${inputClass} h-24 resize-none`} placeholder="Explain why you need financial assistance..." />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3 rounded-lg transition flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? <><CheckCircle size={18}/> Saved!</> : <><Save size={18}/> Save Profile</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBuilder;
