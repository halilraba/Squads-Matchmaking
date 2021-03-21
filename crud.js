
const User = require(__dirname + "/models/user-model.js");
const GameStat = require(__dirname + "/models/gamestat-model.js");

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

exports.createNewStatDocument = function (squadsName, fortniteData) {

    if (fortniteData) {
        const scorePerMatch = fortniteData.scorePerMatch;
        const kd = fortniteData.kd;
        const winRate = fortniteData.winRate;
        const name = squadsName;
        
        const newStatDoc = new GameStat({
            email: name,
            fortniteScorePerMatch: scorePerMatch,
            fortniteKD: kd,
            fortniteWinRate: winRate
        });

        newStatDoc.save(function (err, doc) {
            if (err) {
                console.log(err);
            }
        });
    }
}

// const query = User.where({$or:[{squadsName: squadsName},{codName: codName},{fortniteName: fortniteName}]});
