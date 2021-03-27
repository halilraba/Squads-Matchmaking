const express = require('express');
const router = express.Router();


// Get user profile if user is authenticated 
// Send to landing page if unauthenticated 

router.get("/", (req, res) => {
    
    if (req.isAuthenticated()){
        res.redirect("/profile");
    } else {
        res.redirect("/index");
    }
});

router.get("/index", (req, res) => {
    res.sendFile("index.html", {root: "./views"});
});

module.exports = router;