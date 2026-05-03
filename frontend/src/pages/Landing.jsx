import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Target, BookOpen, Users } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="bg-brand-50 py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full font-medium mb-6">
            <Sparkles size={18} />
            AI-Powered Scholarship Matching
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl">
            Unlock Your Future with <span className="text-brand-600">ScholarCatalyst</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl">
            The smart way to find, apply, and secure scholarships. Let our AI recommendation engine connect you with opportunities tailored to your profile.
          </p>
          <div className="flex gap-4">
            <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-500/30 transition">
              Get Started for Free
            </Link>
            <Link to="/community" className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 transition">
              Explore Community
            </Link>
          </div>
        </section>

        <section className="py-20 px-6 sm:px-12 lg:px-24 bg-white">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose ScholarCatalyst?</h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Recommendations</h3>
              <p className="text-gray-600">Our engine matches you with scholarships based on your academic marks, income, and stream.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">AI SOP Generator</h3>
              <p className="text-gray-600">Stuck on your essay? Generate compelling statements of purpose tailored to specific scholarships in seconds.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Active Community</h3>
              <p className="text-gray-600">Connect with peers, ask questions, and get advice from past winners in our dedicated forum.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>&copy; 2026 ScholarCatalyst. Empowering education through technology.</p>
      </footer>
    </div>
  );
};

export default Landing;
