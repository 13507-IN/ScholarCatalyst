const express = require('express');
const { getScholarships, getRecommendations, createScholarship, updateScholarship, deleteScholarship } = require('../controllers/scholarshipController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getScholarships)
  .post(protect, admin, createScholarship);

router.get('/recommendations/:userId', protect, getRecommendations);

router.route('/:id')
  .put(protect, admin, updateScholarship)
  .delete(protect, admin, deleteScholarship);

module.exports = router;
