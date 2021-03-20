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
    riskScale:Number
});

// const preferenceSchema = mongoose.Schema({

//     _id: mongoose.Schema.Types.ObjectId,
//     numberOfPlayers:{type: String },
//     rankingMode:{type: String},
//     playMode:{type: String, },
//     competitionMode: {type: String},
//     riskMode:{ type: String}
// });

// module.exports = Preference;
// module.exports = mongoose.model('PlayerPreferences',preferenceSchema);

const Preference = new mongoose.model("Preference", preferenceSchema);

module.exports = Preference;

