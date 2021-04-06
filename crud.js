
const User = require(__dirname + "/models/user-model.js");
const GameStat = require(__dirname + "/models/gamestat-model.js");
const Preference = require(__dirname + "/models/preferences-model.js");
// const preference = require(__dirname + "/controllers/playerPreferencesController.js");

exports.checkSquadsUsernameExists = async function (squadsName) {
    let promise = new Promise((resolve, reject) => {
        const query = User.where({squadsName: squadsName});
        query.findOne(function(err, user) {
            if (!err) {
                resolve(user);
            } else {
                console.log(err);
            }
        });
    });

    let result = await promise;
    
    return result;
}

exports.createNewStatDocument = function (email, apexName, apexData, fortniteName, fortniteData) {

    const emailKey = email;
    var scorePerMatch;
    var kd;
    var winRate;
    var level;
    var kills;
    var damage;

    if (fortniteData) {
        scorePerMatch = fortniteData.scorePerMatch;
        kd = fortniteData.kd;
        winRate = fortniteData.winRate;
    }

    if (apexData) {
        level = apexData.level;
        if (apexData.kills) {
            kills = apexData.kills;
        }
        if (apexData.damage) {
            damage = apexData.damage;
        }
    }

    const newStatDoc = new GameStat({
        email: emailKey,
        fortniteName: fortniteName,
        fortniteScorePerMatch: scorePerMatch,
        fortniteKD: kd,
        fortniteWinRate: winRate,
        apexName: apexName,
        apexLevel: level,
        apexKills: kills,   
        apexDamage: damage
    });

    newStatDoc.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
    });
}

exports.findProfileData = async function(email, fn) {
    
    let squadsName = await findUserName(email);
    let gameStats = await findGameStats(email);
    let preferences = await findPreferences(email);

    // let preferences = preference.getPreferenceByEmail();

    fn(squadsName, gameStats, preferences);
}

async function findPreferences(email) {
    let promise = new Promise((resolve, reject) => {

        const query = Preference.where({email: email});
        query.findOne(function(err, preferences) {
            if (!err) {
                resolve(preferences);
            } else {
                console.log(err);
            }
        });
    });

    let result = await promise;
    
    if (result) {
        return result;
    } else {
        return {};
    }
    
}

async function findGameStats(email) {
    let promise = new Promise((resolve, reject) => {

        const query = GameStat.where({email: email});
        query.findOne(function(err, gameStats) {
            if (!err) {
                resolve(gameStats);
            } else {
                console.log(err);
            }
        });
    });

    let result = await promise;
    
    if (result) {
        return result;
    } else {
        return {};
    }
    
}

async function findUserName(email) {
    let promise = new Promise((resolve, reject) => {

        const query = User.where({email: email});
        query.findOne(function(err, user) {
            if (!err) {
                resolve(user);
            } else {
                console.log(err);
            }
        });
    });

    let result = await promise;
    
    if (result) {
        return result.squadsName;
    } else {
        return {};
    }
    
}