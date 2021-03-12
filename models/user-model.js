const mongoose = require("mongoose")

var userSchema = {
    firstName: String,
    lastName: String,
    email: String,
    birthDate: String,
    codName: String,
    fortniteName: String,
    password: String
};


const User = mongoose.model("User", userSchema);

module.exports = User;