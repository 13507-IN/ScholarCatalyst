const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  upvotes: { type: Number, default: 0 }
}, { timestamps: true });

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  upvotes: { type: Number, default: 0 },
  answers: [answerSchema]
}, { timestamps: true });

module.exports = mongoose.model('CommunityPost', postSchema);
