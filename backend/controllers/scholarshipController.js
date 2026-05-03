const Scholarship = require('../models/Scholarship');

// @desc    Get all active scholarships (with optional recommendation scoring)
// @route   GET /api/scholarships
// @access  Public / Student
const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find({ isActive: true });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recommended scholarships for a specific user
// @route   GET /api/scholarships/recommendations/:userId
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    // Basic recommendation logic
    const user = req.user; // from auth middleware
    const scholarships = await Scholarship.find({ isActive: true });
    
    // Scoring logic
    const recommendations = scholarships.map(sch => {
      let score = 0;
      if (user.academicMarks >= sch.minMarks) score += 40;
      if (user.familyIncome <= sch.maxIncome) score += 30;
      if (sch.eligibleStreams.includes(user.stream) || sch.eligibleStreams.length === 0) score += 20;
      if (sch.eligibleLocations.includes(user.location) || sch.eligibleLocations.length === 0) score += 10;
      
      return { scholarship: sch, score };
    });

    // Sort by highest score
    recommendations.sort((a, b) => b.score - a.score);
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a scholarship
// @route   POST /api/scholarships
// @access  Private / Admin
const createScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);
    res.status(201).json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a scholarship
// @route   PUT /api/scholarships/:id
// @access  Private / Admin
const updateScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scholarship) return res.status(404).json({ message: 'Not found' });
    res.json(scholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a scholarship
// @route   DELETE /api/scholarships/:id
// @access  Private / Admin
const deleteScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndDelete(req.params.id);
    if (!scholarship) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Scholarship removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getScholarships,
  getRecommendations,
  createScholarship,
  updateScholarship,
  deleteScholarship
};
