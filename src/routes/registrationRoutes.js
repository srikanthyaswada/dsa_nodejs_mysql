const express = require('express');
const router = express.Router();
const RegistrationController = require('../controllers/RegistrationController');
const upload = require('../middlewares/uploadMiddleware');

const multiUpload = upload.fields([
  { name: 'pan_file', maxCount: 1 },
  { name: 'aadhaar_file', maxCount: 1 },
  { name: 'marksheet_file', maxCount: 1 },
  { name: 'photo_file', maxCount: 1 },
  { name: 'video_file', maxCount: 1 }
]);

router.post('/', multiUpload, RegistrationController.create);
router.get('/', RegistrationController.getAll);
router.get('/:id', RegistrationController.getById);

module.exports = router;
