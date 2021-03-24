const express = require('express');
const router = express.Router();

//const checkAuth
const playerPreferencesController = require('../controllers/playerPreferencesController');


//Handling incoming GET requests
router.get('/getAllPreferences', playerPreferencesController.getPlayersPreferences);

/**
 * Handling POST requests
 */
 router.post('/', playerPreferencesController.createPlayerPreferences);

 router.get('/:email', playerPreferencesController.getPreferenceByEmail);

 module.exports = router;