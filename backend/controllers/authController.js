const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  const { name, email, password, role, schoolOrCollege, phoneNumber, academicMarks, familyIncome, stream, location } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'student',
      schoolOrCollege: schoolOrCollege || '',
      phoneNumber: phoneNumber || '',
      academicMarks: parseFloat(academicMarks) || 0,
      familyIncome: parseFloat(familyIncome) || 0,
      stream: stream || '',
      location: location || ''
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete,
        schoolOrCollege: user.schoolOrCollege,
        phoneNumber: user.phoneNumber,
        academicMarks: user.academicMarks,
        familyIncome: user.familyIncome,
        stream: user.stream,
        location: user.location,
        country: user.country,
        city: user.city,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        currentEducationLevel: user.currentEducationLevel,
        yearOfStudy: user.yearOfStudy,
        extracurriculars: user.extracurriculars,
        achievements: user.achievements,
        languages: user.languages,
        careerGoals: user.careerGoals,
        financialNeedStatement: user.financialNeedStatement,
        linkedinUrl: user.linkedinUrl,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('-password');

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete,
        schoolOrCollege: user.schoolOrCollege,
        phoneNumber: user.phoneNumber,
        academicMarks: user.academicMarks,
        familyIncome: user.familyIncome,
        stream: user.stream,
        location: user.location,
        country: user.country,
        city: user.city,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        currentEducationLevel: user.currentEducationLevel,
        yearOfStudy: user.yearOfStudy,
        extracurriculars: user.extracurriculars,
        achievements: user.achievements,
        languages: user.languages,
        careerGoals: user.careerGoals,
        financialNeedStatement: user.financialNeedStatement,
        linkedinUrl: user.linkedinUrl,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fields = [
      'name', 'schoolOrCollege', 'phoneNumber', 'academicMarks', 'familyIncome',
      'stream', 'location', 'country', 'city', 'dateOfBirth', 'gender',
      'currentEducationLevel', 'yearOfStudy', 'extracurriculars', 'achievements',
      'languages', 'careerGoals', 'financialNeedStatement', 'linkedinUrl', 'profilePhoto'
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // Calculate profile completion with weighted scoring
    const requiredFields = [
      { field: 'name', weight: 10 },
      { field: 'schoolOrCollege', weight: 10 },
      { field: 'academicMarks', weight: 10 },
      { field: 'stream', weight: 10 },
      { field: 'location', weight: 5 },
      { field: 'country', weight: 5 },
      { field: 'currentEducationLevel', weight: 10 },
      { field: 'careerGoals', weight: 10 },
      { field: 'extracurriculars', weight: 5, isArray: true },
      { field: 'achievements', weight: 5, isArray: true },
      { field: 'languages', weight: 5, isArray: true },
      { field: 'phoneNumber', weight: 5 },
      { field: 'dateOfBirth', weight: 5 },
      { field: 'gender', weight: 5 }
    ];

    let totalWeight = 0;
    let earnedWeight = 0;

    requiredFields.forEach(({ field, weight, isArray }) => {
      totalWeight += weight;
      if (isArray) {
        if (Array.isArray(user[field]) && user[field].length > 0) earnedWeight += weight;
      } else {
        if (user[field] && user[field] !== '' && user[field] !== 0) earnedWeight += weight;
      }
    });

    user.profileComplete = Math.round((earnedWeight / totalWeight) * 100);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profileComplete: updatedUser.profileComplete,
      schoolOrCollege: updatedUser.schoolOrCollege,
      academicMarks: updatedUser.academicMarks,
      stream: updatedUser.stream,
      location: updatedUser.location,
      country: updatedUser.country,
      city: updatedUser.city,
      currentEducationLevel: updatedUser.currentEducationLevel,
      careerGoals: updatedUser.careerGoals,
      extracurriculars: updatedUser.extracurriculars,
      achievements: updatedUser.achievements,
      languages: updatedUser.languages,
      dateOfBirth: updatedUser.dateOfBirth,
      gender: updatedUser.gender,
      yearOfStudy: updatedUser.yearOfStudy,
      financialNeedStatement: updatedUser.financialNeedStatement,
      linkedinUrl: updatedUser.linkedinUrl,
      profilePhoto: updatedUser.profilePhoto,
      token: generateToken(updatedUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, updateProfile };
