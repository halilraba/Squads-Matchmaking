
const User = require(__dirname + "/models/user-model.js");
const GameStat = require(__dirname + "/models/gamestat-model.js");
const preference = require(__dirname + "/controllers/playerPreferencesController.js");

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
    let gameStats = await findGameStats(email);

    let preferences = {};

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // DICKSON, I could not get the call to your function below to return data.
    // It is getting an error. 
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // let preferences = preference.getPreferenceByEmail();
    // console.log(preferences);

    fn(gameStats, preferences);
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