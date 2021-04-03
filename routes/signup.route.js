const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signupController');
 
router.get("/", (req, res) => {
    // res.sendFile("new-registration-form.html", {root: "./views"});
    res.render("new-registration-form", {
        squadsErr: "",
        apexErr: "",
        fortniteErr: "",
        emailErr: ""});
});

router.post('/', signupController.register_new_user);

module.exports = router;