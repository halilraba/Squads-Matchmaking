const express = require('express');
const router = express.Router();

//const checkAuth
const playerPreferencesController = require('../controllers/playerPreferencesController');

<<<<<<< HEAD:routes/playerPeferences.route.js
//Handling incoming GET requests
router.get('/getAllPreferences', playerPreferencesController.getPlayersPreferences);
=======
// Handling incoming GET requests
router.get('/', playerPreferencesController.getPlayerPreferences);
>>>>>>> fd4dd2f3fb7e5939eead7b1217950894ace7d0d2:routes/playerPreferences.route.js

/**
 * Handling POST requests
 */
 router.post('/', playerPreferencesController.createPlayerPreferences);

 module.exports = router;