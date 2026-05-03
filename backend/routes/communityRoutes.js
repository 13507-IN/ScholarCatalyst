const express = require('express');
const { getPosts, createPost, addAnswer, upvotePost } = require('../controllers/communityController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.post('/:id/answers', protect, addAnswer);
router.put('/:id/upvote', protect, upvotePost);

module.exports = router;
