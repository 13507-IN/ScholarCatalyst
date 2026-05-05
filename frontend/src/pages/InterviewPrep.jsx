import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Video, Mic, ChevronRight, RotateCcw, CheckCircle, AlertCircle, MessageSquare, X, Play, TrendingUp, Award, Loader2 } from 'lucide-react';

const InterviewPrep = () => {
  const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/_/backend' : 'http://localhost:5000');
  const { user } = useContext(AuthContext);
  const [stage, setStage] = useState('setup');
  const [scholarshipName, setScholarshipName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentTip, setCurrentTip] = useState('');
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scoring, setScoring] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);
  const [error, setError] = useState('');
  const answerRef = useRef(null);

  const startInterview = async () => {
    if (!scholarshipName) {
      setError('Please enter a scholarship name');
      return;
    }
    setStage('interview');
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/interview`, {
        scholarshipName,
        history: [],
        userContext: {
          academicMarks: user?.academicMarks,
          stream: user?.stream,
          careerGoals: user?.careerGoals
        }
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setCurrentQuestion(data.question);
      setCurrentTip(data.tip);
      setHistory([]);
    } catch (err) {
      setError('Failed to start interview. Please try again.');
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/interview`, {
        scholarshipName,
        previousAnswers: userAnswer,
        history: [...history, { question: currentQuestion, answer: userAnswer }]
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setHistory(prev => [...prev, { question: currentQuestion, answer: userAnswer }]);
      setCurrentFeedback(data.feedback || '');
      setCurrentQuestion(data.question);
      setCurrentTip(data.tip || '');
      setUserAnswer('');
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
    }
    setLoading(false);
    setTimeout(() => {
      if (answerRef.current) answerRef.current.focus();
    }, 100);
  };

  const getScore = async () => {
    setScoring(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/ai/interview-score`, {
        history,
        scholarshipName
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setScoreResult(data);
      setStage('results');
    } catch (err) {
      setError('Failed to get score. Please try again.');
    }
    setScoring(false);
  };

  const endInterview = () => {
    if (history.length >= 3) {
      getScore();
    }
  };

  const resetInterview = () => {
    setStage('setup');
    setScholarshipName('');
    setCurrentQuestion('');
    setCurrentFeedback('');
    setHistory([]);
    setScoreResult(null);
    setError('');
  };

  if (stage === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3"><Video className="text-brand-500"/> AI Interview Prep</h1>
          <p className="text-gray-600 mt-1">Practice with AI-powered mock scholarship interviews</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-brand-100 rounded-lg"><Mic size={24} className="text-brand-600"/></div>
            <div>
              <h2 className="text-xl font-bold">Start Your Interview</h2>
              <p className="text-sm text-gray-500">Our AI will act as an interview panelist</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Name</label>
            <input
              type="text"
              value={scholarshipName}
              onChange={e => setScholarshipName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              placeholder="e.g., Rhodes Scholarship, Fulbright Program..."
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-amber-500 mt-0.5 flex-shrink-0"/>
              <div className="text-sm text-amber-800">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="space-y-1 text-amber-700">
                  <li>• AI asks one question at a time (5-7 questions total)</li>
                  <li>• Type your answer as you would speak in a real interview</li>
                  <li>• Get real-time feedback and follow-up questions</li>
                  <li>• Receive a final score with strengths and improvement tips</li>
                </ul>
              </div>
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}

          <button
            onClick={startInterview}
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20}/> : <><Play size={20}/> Begin Interview</>}
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'interview') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Video className="text-brand-500"/> Interview Session</h1>
            <p className="text-sm text-gray-500 mt-1">{scholarshipName} • Question {history.length + 1}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={endInterview} disabled={history.length < 3 || scoring} className="text-sm font-medium text-brand-600 hover:text-brand-700 disabled:opacity-50 disabled:cursor-not-allowed">
              {scoring ? <Loader2 className="animate-spin inline" size={16}/> : 'End & Score'}
            </button>
            <button onClick={resetInterview} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><RotateCcw size={14}/> Reset</button>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
          <div className="bg-brand-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min((history.length / 7) * 100, 100)}%` }}></div>
        </div>

        {/* Current Question */}
        {loading ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <Loader2 className="animate-spin mx-auto mb-3 text-brand-500" size={32}/>
            <p className="text-gray-500">AI is preparing your question...</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-100 rounded-lg"><MessageSquare size={20} className="text-brand-600"/></div>
                <div>
                  <p className="text-sm font-medium text-brand-600 mb-1">Interviewer</p>
                  <p className="text-lg font-medium leading-relaxed">{currentQuestion}</p>
                  {currentTip && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                      <strong>Tip:</strong> {currentTip}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {currentFeedback && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <TrendingUp size={18} className="text-blue-500 mt-0.5"/>
                  <div className="text-sm text-blue-800"><strong>Feedback:</strong> {currentFeedback}</div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Answer</label>
              <textarea
                ref={answerRef}
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 h-40 resize-none text-gray-700 leading-relaxed"
                placeholder="Type your answer here..."
                disabled={loading}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-400">{userAnswer.length} characters</span>
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim() || loading}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-2 rounded-lg transition flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18}/> : 'Submit Answer'} <ChevronRight size={18}/>
                </button>
              </div>
            </div>

            {/* Previous Q&A History */}
            {history.length > 0 && (
              <details className="bg-white rounded-xl shadow-sm border border-gray-100">
                <summary className="p-4 cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                  View previous questions ({history.length})
                </summary>
                <div className="px-4 pb-4 space-y-4 border-t border-gray-50 pt-4">
                  {history.map((item, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium text-gray-700 mb-1">Q{ i + 1}: {item.question}</p>
                      <p className="text-gray-500 pl-4 border-l-2 border-gray-200">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </>
        )}
      </div>
    );
  }

  if (stage === 'results') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3"><Award className="text-brand-500"/> Interview Results</h1>
          <p className="text-gray-600 mt-1">{scholarshipName}</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center mb-6">
          <div className="relative inline-flex items-center justify-center mb-4">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
              <circle cx="60" cy="60" r="54" fill="none" stroke={scoreResult?.overallScore >= 70 ? '#10b981' : scoreResult?.overallScore >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="8"
                strokeDasharray={`${(scoreResult?.overallScore || 0) * 3.39} 339`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"/>
            </svg>
            <span className="absolute text-3xl font-bold">{scoreResult?.overallScore}%</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Overall Score</h2>
          <p className="text-gray-500 text-sm">{scoreResult?.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 text-green-600 mb-4"><CheckCircle size={20}/> Strengths</h3>
            <ul className="space-y-2">
              {scoreResult?.strengths?.map((s, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 mt-1">•</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold flex items-center gap-2 text-amber-600 mb-4"><AlertCircle size={20}/> Areas to Improve</h3>
            <ul className="space-y-2">
              {scoreResult?.weaknesses?.map((w, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-amber-500 mt-1">•</span>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {scoreResult?.improvementTips && scoreResult.improvementTips.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h3 className="font-bold mb-4">💡 Improvement Tips</h3>
            <ul className="space-y-3">
              {scoreResult.improvementTips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                  <span className="bg-brand-100 text-brand-700 font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={resetInterview} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2">
          <RotateCcw size={18}/> Practice Again
        </button>
      </div>
    );
  }

  return null;
};

export default InterviewPrep;
