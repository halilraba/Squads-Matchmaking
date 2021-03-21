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
        res.sendFile(__dirname + "/views/user-profile.html")
    } else {
        res.redirect("/signin");
    }
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
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

    apiCalls.checkUserAccounts(req.body.fortniteName, req.body.squadsName, (fortniteData, squadsUser)=> {

        if (!fortniteData || squadsUser) {
            res.redirect("/signup");
        } else {

            // Create and authenticate user 
            User.register({
                email: req.body.email,
                firstName: req.body.fname,
                lastName: req.body.lname,
                birthDate: req.body.bdate,
                squadsName: req.body.squadsName,
                codName: req.body.codName,
                fortniteName: req.body.fortniteName
            }, req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/signup");
                } else {
                    passport.authenticate("local")(req, res, function() {
                        // Create user game stat document if username entered
                        if (req.body.fortniteName) {
                            crud.createNewStatDocument(req.body.squadsName, fortniteData);
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
    res.sendFile(__dirname + "/views/preferences-form.html");
});


// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
// });


module.exports = app;