const express = require('express');
const { applyScholarship, getMyApplications, getApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, admin } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .post(protect, applyScholarship)
  .get(protect, admin, getApplications);

router.get('/my', protect, getMyApplications);
router.put('/:id/status', protect, admin, updateApplicationStatus);

module.exports = router;
