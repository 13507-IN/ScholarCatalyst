import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Star, Quote, Award, MapPin, Calendar, ChevronLeft, ChevronRight, BookOpen, TrendingUp } from 'lucide-react';

const SuccessStories = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [testimonials, setTestimonials] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, [user]);

  const fetchTestimonials = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/testimonials`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setTestimonials(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const navigateStory = (dir) => {
    if (!selected) return;
    const idx = testimonials.findIndex(t => t._id === selected._id);
    const newIdx = idx + dir;
    if (newIdx >= 0 && newIdx < testimonials.length) {
      setSelected(testimonials[newIdx]);
    } else {
      setSelected(null);
    }
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (selected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition">
          <ChevronLeft size={20}/> Back to all stories
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-brand-500 to-brand-700 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm">
                {selected.studentName.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{selected.studentName}</h1>
                <p className="text-brand-100">{selected.studentRole}</p>
              </div>
              {selected.featured && (
                <span className="ml-auto bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
              )}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-2 mb-6 text-gray-400"><Quote size={24}/></div>
            <blockquote className="text-xl text-gray-700 leading-relaxed italic mb-8">
              "{selected.quote}"
            </blockquote>

            <div className="prose prose-lg max-w-none text-gray-600 mb-8 whitespace-pre-wrap">{selected.fullStory}</div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Award size={24} className="mx-auto text-brand-500 mb-2"/>
                <p className="text-sm font-medium text-gray-500">Scholarship</p>
                <p className="font-bold text-gray-900">{selected.scholarshipName}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <BookOpen size={24} className="mx-auto text-brand-500 mb-2"/>
                <p className="text-sm font-medium text-gray-500">University</p>
                <p className="font-bold text-gray-900">{selected.university}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <MapPin size={24} className="mx-auto text-brand-500 mb-2"/>
                <p className="text-sm font-medium text-gray-500">Country</p>
                <p className="font-bold text-gray-900">{selected.country}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => navigateStory(-1)}
              disabled={testimonials.findIndex(t => t._id === selected._id) === 0}
              className="flex items-center gap-1 text-sm font-medium disabled:opacity-30 hover:text-brand-600 transition"
            >
              <ChevronLeft size={18}/> Previous
            </button>
            <span className="text-sm text-gray-400">
              {testimonials.findIndex(t => t._id === selected._id) + 1} of {testimonials.length}
            </span>
            <button
              onClick={() => navigateStory(1)}
              disabled={testimonials.findIndex(t => t._id === selected._id) === testimonials.length - 1}
              className="flex items-center gap-1 text-sm font-medium disabled:opacity-30 hover:text-brand-600 transition"
            >
              Next <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3"><TrendingUp className="text-brand-500"/> Success Stories</h1>
        <p className="text-gray-600 mt-1">Inspiring journeys from students who won scholarships</p>
      </div>

      {/* Featured Story */}
      {testimonials.filter(t => t.featured).length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Star className="text-amber-400" size={20}/> Featured Story</h2>
          {testimonials.filter(t => t.featured).map(story => (
            <button
              key={story._id}
              onClick={() => setSelected(story)}
              className="w-full text-left bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-8 text-white hover:from-brand-600 hover:to-brand-800 transition"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {story.studentName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{story.studentName}</h3>
                  <p className="text-brand-100 text-sm mb-3">{story.studentRole} • {story.university}, {story.country}</p>
                  <blockquote className="text-lg italic text-brand-50 mb-4">"{story.quote.slice(0, 150)}..."</blockquote>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-white/80">Read full story <ChevronRight size={16}/></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* All Stories Grid */}
      <h2 className="text-lg font-bold mb-4">All Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.filter(t => !t.featured).map(story => (
          <button
            key={story._id}
            onClick={() => setSelected(story)}
            className="text-left bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-brand-200 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                {story.studentName.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{story.studentName}</div>
                <div className="text-xs text-gray-500">{story.studentRole}</div>
              </div>
            </div>
            <blockquote className="text-sm text-gray-600 italic mb-4 line-clamp-3">"{story.quote}"</blockquote>
            <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1"><Award size={12}/> {story.scholarshipName}</span>
              <span className="flex items-center gap-1"><MapPin size={12}/> {story.country}</span>
            </div>
          </button>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16">
          <Star size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No success stories yet</p>
          <p className="text-gray-400 text-sm mt-1">Be the first to share your journey</p>
        </div>
      )}
    </div>
  );
};

export default SuccessStories;
