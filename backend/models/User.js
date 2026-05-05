const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  
  // Student Profile Data
  schoolOrCollege: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  academicMarks: { type: Number, default: 0 },
  familyIncome: { type: Number, default: 0 },
  stream: { type: String, default: '' },
  location: { type: String, default: '' },
  profileComplete: { type: Number, default: 0 },
  
  // Enhanced Profile Builder
  country: { type: String, default: '' },
  city: { type: String, default: '' },
  dateOfBirth: { type: Date },
  gender: { type: String, default: '' },
  currentEducationLevel: { type: String, default: '' },
  yearOfStudy: { type: String, default: '' },
  extracurriculars: [{ type: String }],
  achievements: [{ type: String }],
  languages: [{ type: String }],
  careerGoals: { type: String, default: '' },
  financialNeedStatement: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  profilePhoto: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
