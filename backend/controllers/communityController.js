const CommunityPost = require('../models/CommunityPost');

// @desc    Get all posts
// @route   GET /api/community
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate('user', 'name').populate('answers.user', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a post
// @route   POST /api/community
// @access  Private
const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = await CommunityPost.create({
      user: req.user._id,
      title,
      content,
      tags
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add answer to post
// @route   POST /api/community/:id/answers
// @access  Private
const addAnswer = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const answer = {
      user: req.user._id,
      content: req.body.content
    };

    post.answers.push(answer);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Upvote post
// @route   PUT /api/community/:id/upvote
// @access  Private
const upvotePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    post.upvotes += 1;
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  addAnswer,
  upvotePost
};
