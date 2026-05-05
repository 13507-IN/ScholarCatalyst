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
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Not authorized' });
    
    const scholarships = await Scholarship.find({ isActive: true });
    
    const hasProfile = user.academicMarks > 0 || user.stream || user.location;
    
    const recommendations = scholarships.map(sch => {
      let score = 0;
      
      if (!hasProfile) {
        score = 50;
      } else {
        if (user.academicMarks > 0 && user.academicMarks >= sch.minMarks) score += 40;
        else if (user.academicMarks === 0) score += 20;
        
        if (user.familyIncome > 0 && user.familyIncome <= sch.maxIncome) score += 30;
        else if (user.familyIncome === 0) score += 15;
        
        if (user.stream && (sch.eligibleStreams.includes(user.stream) || sch.eligibleStreams.length === 0)) score += 20;
        else if (!user.stream || sch.eligibleStreams.length === 0) score += 10;
        
        if (user.location && (sch.eligibleLocations.includes(user.location) || sch.eligibleLocations.length === 0)) score += 10;
        else if (!user.location || sch.eligibleLocations.length === 0) score += 5;
      }
      
      if (user.stream && sch.eligibleStreams.length > 0 && !sch.eligibleStreams.includes(user.stream)) score -= 20;
      
      return { scholarship: sch, score };
    });

    const sorted = recommendations
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score);
    
    res.json(sorted.slice(0, 20));
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
