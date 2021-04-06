const mongoose = require('mongoose');
const User = require(__dirname + './../models/user-model');
const passport = require("passport");
const crud = require(__dirname + "./../crud.js");
const apiCalls = require(__dirname + "./../api-calls.js");

exports.rank_matches = async function(userStats, userPreferences, gameMatches, game, fn) {

    let promise = new Promise((resolve, reject) => {
        var MatchScores = [];
        for (const match of gameMatches) {
            let preferenceMatchScore = get_preference_match_score(userPreferences, match);
            let gameMatchScore;

            switch (game) {
                case "Fortnite":
                    gameMatchScore = get_fortnite_match_score(userStats, match);
                    break;

                case "Apex Legends":
                    gameMatchScore = get_apex_match_score(userStats, match);
                    break;
            }
            
            let totalMatchScore = preferenceMatchScore - gameMatchScore;

            MatchScores.push({squadsName: match.squadsName, 
                                    preferenceMatchScore: preferenceMatchScore,
                                    gameMatchScore: gameMatchScore, 
                                    totalMatchScore: totalMatchScore});
        }

        MatchScores.sort(function (a, b) {
            return (a.totalMatchScore - b.totalMatchScore) * -1;
        });

        // console.log(MatchScores);

        matchesSorted = [];
        MatchScores.forEach(function(match) {
            matchesSorted.push(match.squadsName)
        });

        resolve(matchesSorted);
    });

    let result = await promise;
    fn(result);
};

function get_fortnite_match_score(userStats, fortniteMatch) {
    let scorePerMatchScore;
    let kdScore;
    let winRateScore;

    if (userStats.fortniteScorePerMatch > fortniteMatch.fortniteScorePerMatch) {
        scorePerMatchScore = userStats.fortniteScorePerMatch - fortniteMatch.fortniteScorePerMatch;
    } else {
        scorePerMatchScore = fortniteMatch.fortniteScorePerMatch - userStats.fortniteScorePerMatch;
    }

    if (userStats.fortniteKD > fortniteMatch.fortniteKD) {
        kdScore = (userStats.fortniteKD * 100) - (fortniteMatch.fortniteKD * 100);
    } else {
        kdScore = (fortniteMatch.fortniteKD * 100) - (userStats.fortniteKD * 100);
    }

    if (userStats.fortniteWinRate > fortniteMatch.fortniteWinRate) {
        winRateScore = (userStats.fortniteWinRate * 100) - (fortniteMatch.fortniteWinRate * 100);
    } else {
        winRateScore = (fortniteMatch.fortniteWinRate * 100) - (userStats.fortniteWinRate * 100);
    }

    return scorePerMatchScore + kdScore + winRateScore;
}

function get_apex_match_score(userStats, apexMatch) {
    let levelScore = 0;
    let killsScore = 0;
    let damageScore = 0;
    let divisor = 1;

    if (userStats.apexLevel > apexMatch.apexLevel) {
        levelScore = userStats.apexLevel - apexMatch.apexLevel;
    } else {
        levelScore = apexMatch.apexLevel - userStats.apexLevel;
    }

    if (userStats.apexKills && apexMatch.apexKills) {
        if (userStats.apexKills > apexMatch.apexKills) {
            killsScore = userStats.apexKills - apexMatch.apexKills;
        } else {
            killsScore = apexMatch.apexKills - userStats.apexKills;
        }
        
        divisor += 1;
    }
    
    if (userStats.apexDamage && apexMatch.apexDamage) {
        if (userStats.apexDamage > apexMatch.apexDamage) {
            damageScore = userStats.apexDamage - apexMatch.apexDamage;
        } else {
            damageScore = apexMatch.apexDamage - userStats.apexDamage;
        }

        divisor += 1;
    }

    return (levelScore + killsScore + damageScore) / (divisor * 2);
}

function get_preference_match_score(userStats, fortniteMatch) {
    let funScore;
    let riskScore;

    if (userStats.funScale > fortniteMatch.funScale) {
        funScore = (100 - (userStats.funScale - fortniteMatch.funScale)) * 10;
    } else {
        funScore = (100 - (fortniteMatch.funScale - userStats.funScale)) * 10;
    }

    if (userStats.riskScale > fortniteMatch.riskScale) {
        riskScore = (100 - (userStats.riskScale - fortniteMatch.riskScale)) * 10;
    } else {
        riskScore = (100 - (fortniteMatch.riskScale - userStats.riskScale)) * 10;
    }

    let preferenceMatchScore = funScore + riskScore;

    if (userStats.duos != fortniteMatch.duos) {
        preferenceMatchScore -= 100;
    }
    if (userStats.trios != fortniteMatch.trios) {
        preferenceMatchScore -= 100;
    }
    if (userStats.squads != fortniteMatch.squads) {
        preferenceMatchScore -= 100;
    }
    if (userStats.casual != fortniteMatch.casual) {
        preferenceMatchScore -= 100;
    }
    if (userStats.ranked != fortniteMatch.ranked) {
        preferenceMatchScore -= 100;
    }
    if (userStats.competitions != fortniteMatch.competitions) {
        preferenceMatchScore -= 100;
    }
    if (userStats.exhibitions != fortniteMatch.exhibitions) {
        preferenceMatchScore -= 100;
    }

    return preferenceMatchScore;
}

