const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['transcript', 'recommendation_letter', 'certificate', 'id_proof', 'essay', 'other'], required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number },
  mimeType: { type: String },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
