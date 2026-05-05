const Document = require('../models/Document');

const uploadDocument = async (req, res) => {
  try {
    const { name, type, fileUrl, fileSize, mimeType, description } = req.body;

    const doc = await Document.create({
      user: req.user._id,
      name,
      type,
      fileUrl,
      fileSize,
      mimeType,
      description: description || ''
    });

    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await doc.deleteOne();
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadDocument, getUserDocuments, deleteDocument };
