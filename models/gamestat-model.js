const mongoose = require("mongoose");

const gameStatSchema = new mongoose.Schema ({
    email: String,
    fortniteName: String,
    fortniteScorePerMatch: Number,
    fortniteKD: Number,
    fortniteWinRate: Number,
    apexName: String,
    apexLevel: Number,
    apexKills: Number,
    apexDamage: Number
});

const GameStat = new mongoose.model("GameStat", gameStatSchema);

module.exports = GameStat;