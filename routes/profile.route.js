const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');


// Get user profile if user is authenticated 
router.get('/', profileController.get_user_profile);

module.exports = router;