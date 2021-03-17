const mongoose = require("mongoose");

const preferenceSchema = {
    squadsName: String,
    preference1: Number
};

const Preference = new mongoose.model("Preference", preferenceSchema);

module.exports = Preference;