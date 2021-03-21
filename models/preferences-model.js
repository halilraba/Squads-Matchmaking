const mongoose = require('mongoose');

const preferenceSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    numberOfPlayers:{type: [String] , required:[true,'required']},
    rankingMode:{type: [String], required: [true,'required']},
    playMode:{type: [String], required: [true, 'required' ]},
    competitionMode: {type: [String], required:[ true, 'competion mode required']},
    riskMode:{ type: [String], required: [true,'required']}
});

module.exports = mongoose.model('PlayerPreferences',preferenceSchema);

// const mongoose = require("mongoose");

// const preferenceSchema = {
//     squadsName: String,
//     preference1: Number
// };

// const Preference = new mongoose.model("Preference", preferenceSchema);

// module.exports = Preference;


   