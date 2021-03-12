const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crud = require(__dirname + "/crud.js");
const User = require(__dirname + "/models/user-model.js");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-brad:squads@cluster0.1ldz0.mongodb.net/squadsDB", {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/sign-in.html");
});

// app.post("/", (req, res) => {
//     var siEmail = req.body.email;
//     var siPassword = req.body.pwd;

//     crud.siValidation(siEmail, siPassword, function(user) {
//         if (user) {
//             console.log(user);
//             const currentUser = user;
//             res.redirect("/profile");
//         } else {
//             res.redirect("/");
//         }
//     });
// });

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/new-registration-form.html");
});

app.post("/signup", (req, res) => {
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;
    var birthDate = req.body.bdate;
    var codName = req.body.codName;
    var fortniteName = req.body.fortniteName;
    var password = req.body.pwd;

    crud.addNewUser(firstName, lastName, email, birthDate, codName, fortniteName, password, function(userAdded) {
        if (userAdded) {
            res.redirect("/");
        } else {
            res.redirect("/signup");
        }
    });
});

app.get("/profile", (req, res) => {
    res.write("<h1>Signed In Successfully</h1>");
    res.write("<h2>This is where User Profile Page will be.</h2>");
    res.send();
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Server has started successfully.")
});