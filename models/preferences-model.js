const mongoose = require('mongoose');

const preferenceSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    numberOfPlayers:{type: String },
    rankingMode:{type: String},
    playMode:{type: String, },
    competitionMode: {type: String},
    riskMode:{ type: String}
});

module.exports = mongoose.model('PlayerPreferences',preferenceSchema);

// const mongoose = require("mongoose");

// const preferenceSchema = {
//     squadsName: String,
//     preference1: Number
// };

// const Preference = new mongoose.model("Preference", preferenceSchema);

// module.exports = Preference;


   