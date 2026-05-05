const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scholarship: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship', required: true },
  status: { type: String, enum: ['Draft', 'Applied', 'Pending', 'Accepted', 'Rejected'], default: 'Draft' },
  documents: [{
    name: String,
    url: String
  }],
  sopText: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
