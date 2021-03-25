require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const passportLocalMongoose = require("passport-local-mongoose");


const User = require(__dirname + "/models/user-model.js");
const apiCalls = require(__dirname + "/api-calls.js");
const crud = require(__dirname + "/crud.js");

const playerPreferencesRoutes = require(__dirname + '/routes/playerPreferences.route.js');

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const secret = process.env.SECRET;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const uri = process.env.DB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", (req, res) => {
    
    if (req.isAuthenticated()){
        res.redirect("/profile");
    } else {
        res.redirect("/index");
    }
});

app.get("/profile", (req, res) => {

    if (req.isAuthenticated()){
        let email = req.session.email;
        crud.findProfileData(email, (gameStats, preferences)=> {
            // res.sendFile(__dirname + "/views/user-profile.html");
            res.render("user-profile-stats", {
                fortniteName: gameStats.fortniteName,
                scorePerMatch: gameStats.fortniteScorePerMatch,
                winRate: gameStats.fortniteWinRate, 
                killRatio: gameStats.fortniteKD, 
                apexName: gameStats.apexName,
                level: gameStats.apexLevel, 
                kills: gameStats.apexKills, 
                damage: gameStats.apexDamage, 
                duos: preferences.duos, 
                trios: preferences.trios, 
                squads: preferences.squads, 
                casual: preferences.casual, 
                ranked: preferences.ranked, 
                competitions: preferences.competitions, 
                exhibitions: preferences.exhibitions, 
                fcScale: preferences.funScale,  
                rcScale: preferences.riskScale});

        });
    } else {
        res.redirect("/signin");
    }
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/views/sign-in.html");
});

app.post("/signin", (req, res) => {

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
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/new-registration-form.html");
});

app.post("/signup", (req, res) => {

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
});


app.use('/preferences', playerPreferencesRoutes);

app.get('/preferences', (req, res) => {
    if (req.isAuthenticated()){
        res.sendFile(__dirname + "/views/preferences-form.html");
    } else {
        res.redirect("/signin");
    }
    
});


module.exports = app;