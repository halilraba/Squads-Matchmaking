const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({

    email: String,
    duos: String,
    trios: String,
    squads: String,
    casual: String,
    ranked: String,
    competitions: String,
    exhibitions: String,
    funScale: Number,
    riskScale: Number
});

// module.exports = mongoose.model('PlayerPreferences',preferenceSchema);

// const mongoose = require("mongoose");

// const preferenceSchema = {
//     squadsName: String,
//     preference1: Number
// };

const Preference = new mongoose.model("Preference", preferenceSchema);

module.exports = Preference;


   