require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const User = require(__dirname + "/models/user-model.js");

const indexRoutes = require(__dirname + '/routes/index.route.js');
const profileRoutes = require(__dirname + '/routes/profile.route.js');
const signinRoutes = require(__dirname + '/routes/signin.route.js');
const signupRoutes = require(__dirname + '/routes/signup.route.js');
const matchRoutes = require(__dirname + '/routes/match.route.js');
const playerPreferencesRoutes = require(__dirname + '/routes/playerPreferences.route.js');
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

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


// ROUTES 

app.use('/', indexRoutes);
app.use('/index', indexRoutes);

app.use('/profile', profileRoutes);

app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);

app.delete('/signout', (req, res)=> {
    req.logout()
    req.redirect('/signin')
})

app.use('/preferences', playerPreferencesRoutes);

app.get('/preferences', (req, res) => {
    if (req.isAuthenticated()){
        res.sendFile(__dirname + "/views/preferences-form.html");
    } else {
        res.redirect("/signin");
    }
    
});

app.use('/match', matchRoutes);


module.exports = app;