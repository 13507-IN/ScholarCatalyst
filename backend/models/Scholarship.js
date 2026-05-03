const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  
  // Eligibility Criteria for matching
  minMarks: { type: Number, default: 0 },
  maxIncome: { type: Number, default: 999999999 },
  eligibleStreams: [{ type: String }],
  eligibleLocations: [{ type: String }],
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Scholarship', scholarshipSchema);
