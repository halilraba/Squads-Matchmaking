const mongoose = require('mongoose');
const User = require(__dirname + './../models/user-model');
const passport = require("passport");
const crud = require(__dirname + "./../crud.js");
const apiCalls = require(__dirname + "./../api-calls.js");


exports.register_new_user = function(req, res) {
    
    apiCalls.checkUserAccounts(req.body.apexName, req.body.fortniteName, req.body.squadsName, (apexData, fortniteData, squadsUser)=> {

        if (!apexData || !fortniteData || squadsUser) {
            res.redirect("/signup");
        } else {

            // Create and authenticate user 
            User.register({
                email: req.body.email,
                firstName: req.body.fname,
                lastName: req.body.lname,
                birthDate: req.body.bdate,
                squadsName: req.body.squadsName,
                apexName: req.body.apexName,
                fortniteName: req.body.fortniteName
            }, req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/signup");
                } else {
                    passport.authenticate("local")(req, res, function() {
                        req.session.email = req.body.email;
                        req.session.save();

                        // Create user game stat document if username entered
                        if (req.body.fortniteName || req.body.apexName) {
                            crud.createNewStatDocument(req.body.email, req.body.apexName, apexData, req.body.fortniteName, fortniteData);
                        }

                        res.redirect("/preferences");
                    });
                }
            });
        }
    });
};