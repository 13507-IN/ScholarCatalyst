const Application = require('../models/Application');
const Notification = require('../models/Notification');

// @desc    Apply for a scholarship
// @route   POST /api/applications
// @access  Private / Student
const applyScholarship = async (req, res) => {
  try {
    const { scholarshipId, sopText, documents } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ user: req.user._id, scholarship: scholarshipId });
    if (existing) return res.status(400).json({ message: 'Already applied for this scholarship' });

    const application = await Application.create({
      user: req.user._id,
      scholarship: scholarshipId,
      sopText,
      documents
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my
// @access  Private / Student
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id }).populate('scholarship');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/applications
// @access  Private / Admin
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user', '-password').populate('scholarship');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private / Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);
    
    if (!application) return res.status(404).json({ message: 'Not found' });
    
    application.status = status;
    await application.save();

    // Create Notification
    await Notification.create({
      user: application.user,
      message: `Your application status has been updated to: ${status}`,
      type: 'application'
    });

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  applyScholarship,
  getMyApplications,
  getApplications,
  updateApplicationStatus
};
