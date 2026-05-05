const express = require('express');
const { generateSop, interviewQuestion, interviewScore } = require('../controllers/aiController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/generate-sop', protect, generateSop);
router.post('/interview', protect, interviewQuestion);
router.post('/interview-score', protect, interviewScore);

module.exports = router;
