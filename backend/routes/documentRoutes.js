const express = require('express');
const { uploadDocument, getUserDocuments, deleteDocument } = require('../controllers/documentController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, uploadDocument);
router.get('/', protect, getUserDocuments);
router.delete('/:id', protect, deleteDocument);

module.exports = router;
