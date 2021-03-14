const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const User = require(__dirname + "/models/user-model.js");
// const crud = require(__dirname + "/crud.js");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const secret = process.env.SECRET;

app.use(session({
    secret: "squads",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-brad:squads@cluster0.1ldz0.mongodb.net/squadsDB", {
// mongoose.connect("mongodb://localhost:27017/squadsDB", {
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
        res.sendFile(__dirname + "/views/index.html");
    } else {
        res.redirect("/login");
    }
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/views/sign-in.html");
});

app.post("/login", (req, res) => {
    
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
                failureRedirect: "/login"})(req, res, function() {
                res.redirect("/");
            });
        }
    });
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/new-registration-form.html");
});

app.post("/signup", (req, res) => {

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
                res.redirect("/");
            });
        }
    });
});



let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Server has started successfully.")
});