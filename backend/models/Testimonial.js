const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentRole: { type: String, required: true },
  scholarshipName: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String, default: '' },
  quote: { type: String, required: true },
  fullStory: { type: String, required: true },
  year: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
