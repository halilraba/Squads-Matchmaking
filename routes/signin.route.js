const express = require('express');
const router = express.Router();

const signinController = require('../controllers/signinController');

// Get user profile if user is authenticated 
router.get("/", (req, res) => {
    res.sendFile("sign-in.html", {root: "./views"});
});

router.post('/', signinController.signin_user);

module.exports = router;