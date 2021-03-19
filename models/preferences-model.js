const mongoose = require("mongoose");

const preferenceSchema = {
    squadsName: String,
    solo: String,
    duos: String,
    trios: String,
    squads: String,
    casual: String,
    ranked: String,
    competitions: String,
    exhibitions: String,
    funScale: Number,
    riskScale:Number
};

const Preference = new mongoose.model("Preference", preferenceSchema);

module.exports = Preference;
