const mongoose = require('mongoose');

<<<<<<< HEAD
const preferenceSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    numberOfPlayers:{type: [String] , required:[true,'required']},
    rankingMode:{type: [String], required: [true,'required']},
    playMode:{type: [String], required: [true, 'required' ]},
    competitionMode: {type: [String], required:[ true, 'competion mode required']},
    riskMode:{ type: [String], required: [true,'required']}
=======
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
>>>>>>> fd4dd2f3fb7e5939eead7b1217950894ace7d0d2
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

