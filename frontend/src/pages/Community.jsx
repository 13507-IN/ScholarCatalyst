import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { MessageCircle, ThumbsUp } from 'lucide-react';

const Community = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/community');
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) return alert('Please login to post');
    try {
      await axios.post('http://localhost:5000/api/community', newPost, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPosts();
      setNewPost({ title: '', content: '' });
    } catch (err) {
      alert('Error creating post');
    }
  };

  const handleUpvote = async (id) => {
    if (!user) return alert('Please login to vote');
    try {
      await axios.put(`http://localhost:5000/api/community/${id}/upvote`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      fetchPosts();
    } catch (err) {
      alert('Error upvoting');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Forum</h1>
      
      {user && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold mb-4">Start a Discussion</h2>
          <form onSubmit={handlePost} className="space-y-4">
            <input className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500" placeholder="Question Title" required value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} />
            <textarea className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 resize-none h-24" placeholder="What's on your mind?" required value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} />
            <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition">Post Question</button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1 text-gray-500">
                <button onClick={() => handleUpvote(post._id)} className="hover:text-brand-600 transition"><ThumbsUp size={20} /></button>
                <span className="font-bold text-gray-900">{post.upvotes}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Posted by <span className="font-medium text-gray-900">{post.user?.name}</span></span>
                  <span className="flex items-center gap-1"><MessageCircle size={16} /> {post.answers?.length} Answers</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && <p className="text-center text-gray-500">No posts yet. Be the first to start a discussion!</p>}
      </div>
    </div>
  );
};

export default Community;
