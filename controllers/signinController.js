const mongoose = require('mongoose');
const User = require(__dirname + './../models/user-model');
const passport = require("passport");


exports.signin_user = function(req, res) {
    
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local", {
                successfulRedirect: "/",
                failureRedirect: "/signin"})(req, res, function() {
                res.redirect("/");
                req.session.email = req.body.email;
                req.session.save();
            });
        }
    });
};