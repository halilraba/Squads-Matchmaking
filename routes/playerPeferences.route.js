const express = require('express');
const router = express.Router();

//const checkAuth
const playerPreferencesController = require('../controllers/playerPreferencesController');

//Handling incoming GET requests
//router.get('/', playerPreferences.getPlayerPreferences);

/**
 * Handling POST requests
 */
 router.post('/', playerPreferencesController.createPlayerPreferences);

 module.exports = router;