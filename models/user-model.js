const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema ({
    email: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    squadsName: String,
    apexName: String,
    fortniteName: String,
    password: String
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

const User = new mongoose.model("User", userSchema);

module.exports = User;