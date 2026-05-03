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
  profileComplete: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
