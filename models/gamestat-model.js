const mongoose = require("mongoose");

const gameStatSchema = new mongoose.Schema ({
    squadsName: String,
    fortniteScorePerMatch: Number,
    fortniteKD: Number,
    fortniteWinRate: Number
});

const GameStat = new mongoose.model("GameStat", gameStatSchema);

module.exports = GameStat;