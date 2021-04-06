const express = require('express');
const router = express.Router();

const matchController = require('../controllers/matchController');

// !!!!!!!!!!!!!!
// The array below is for testing only -- it should be removed when match queries are working 
// !!!!!!!!!!!!!!
const gameMatches = [
    {squadsName: "Spider-Man", apexName: "Spider-Man", apexLevel: 9751, apexKills: 9735, apexDamage: 5650,
    fortniteName: "Spider-Man", fortniteScorePerMatch: 290.8, fortniteKD: 1.45, fortniteWinRate: 6.95,
    duos: "Y", trios: "", squads: "Y", casual: "Y", ranked: "Y", competitions: "Y", exhibitions: "Y", funScale: 25, riskScale: 75},
    {squadsName: "Wolverine", apexName: "Wolverine", apexLevel: 7474, apexKills: 2728,
    fortniteName: "Wolverine", fortniteScorePerMatch: 560.2, fortniteKD: 2.33, fortniteWinRate: 7.78,
    duos: "", trios: "Y", squads: "Y", casual: "Y", ranked: "", competitions: "", exhibitions: "Y", funScale: 75, riskScale: 25},
    {squadsName: "Hulk", apexName: "Hulk", apexLevel: 7755, apexDamage: 1599,
    fortniteName: "Hulk", fortniteScorePerMatch: 320.3, fortniteKD: 1.95, fortniteWinRate: 7.02,
    duos: "Y", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "", exhibitions: "Y", funScale: 50, riskScale: 50},
    {squadsName: "Captain America", apexName: "Captain America", apexLevel: 534, apexKills: 5117, apexDamage: 2964,
    fortniteName: "Captain America", fortniteScorePerMatch: 600.8, fortniteKD: 2.78, fortniteWinRate: 8.12,
    duos: "", trios: "", squads: "Y", casual: "Y", ranked: "", competitions: "Y", exhibitions: "Y", funScale: 1, riskScale: 1},
    {squadsName: "Rogue", apexName: "Rogue", apexLevel: 7794,
    fortniteName: "Rogue", fortniteScorePerMatch: 501.2, fortniteKD: 1.71, fortniteWinRate: 8.01,
    duos: "", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "", exhibitions: "Y", funScale: 99, riskScale: 99},
    {squadsName: "Wanda Maximoff", apexName: "Wanda Maximoff", apexLevel: 2271, apexKills: 934, apexDamage: 9034,
    fortniteName: "Wanda Maximoff", fortniteScorePerMatch: 103.9, fortniteKD: 0.67, fortniteWinRate: 4.02,
    duos: "Y", trios: "", squads: "Y", casual: "Y", ranked: "", competitions: "", exhibitions: "Y", funScale: 1, riskScale: 99},
    {squadsName: "Vision", apexName: "Vision", apexLevel: 6420, apexKills: 6939, apexDamage: 3445,
    fortniteName: "Vision", fortniteScorePerMatch: 1000.0, fortniteKD: 3.00, fortniteWinRate: 10.00,
    duos: "Y", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "Y", exhibitions: "Y", funScale: 99, riskScale: 1},
    {squadsName: "Professor X", apexName: "Professor X", apexLevel: 2912, apexKills: 3819, apexDamage: 7697,
    fortniteName: "Professor X", fortniteScorePerMatch: 450.6, fortniteKD: 1.87, fortniteWinRate: 7.55,
    duos: "", trios: "", squads: "Y", casual: "Y", ranked: "", competitions: "", exhibitions: "Y", funScale: 40, riskScale: 60},
    {squadsName: "Magneto", apexName: "Magneto", apexLevel: 1887, apexDamage: 5769,
    fortniteName: "Magneto", fortniteScorePerMatch: 450.6, fortniteKD: 1.78, fortniteWinRate: 6.56,
    duos: "Y", trios: "", squads: "Y", casual: "Y", ranked: "Y", competitions: "", exhibitions: "Y", funScale: 60, riskScale: 60},
    {squadsName: "Thor", apexName: "Thor", apexLevel: 4513, apexKills: 5247,
    fortniteName: "Thor", fortniteScorePerMatch: 99.9, fortniteKD: 0.59, fortniteWinRate: 2.75,
    duos: "", trios: "Y", squads: "Y", casual: "Y", ranked: "", competitions: "Y", exhibitions: "Y", funScale: 60, riskScale: 60},
    {squadsName: "Rocket Raccoon", apexName: "Rocket Raccoon", apexLevel: 1862, apexKills: 1385, apexDamage: 6126,
    fortniteName: "Rocket Raccoon", fortniteScorePerMatch: 80.8, fortniteKD: 0.45, fortniteWinRate: 2.24,
    duos: "Y", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "", exhibitions: "Y", funScale: 40, riskScale: 40},
    {squadsName: "Loki", apexName: "Loki", apexLevel: 7374,
    fortniteName: "Loki", fortniteScorePerMatch: 298.5, fortniteKD: 1.12, fortniteWinRate: 6.01,
    duos: "", trios: "", squads: "Y", casual: "Y", ranked: "", competitions: "", exhibitions: "Y", funScale: 30, riskScale: 70},
    {squadsName: "Iron Man", apexName: "Iron Man", apexLevel: 9228, apexKills: 3913, apexDamage: 4658,
    fortniteName: "Iron Man", fortniteScorePerMatch: 170.7, fortniteKD: 1.01, fortniteWinRate: 5.32,
    duos: "", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "Y", exhibitions: "Y", funScale: 70, riskScale: 30},
    {squadsName: "Black Widow", apexName: "Black Widow", apexLevel: 9802, apexKills: 5239,
    fortniteName: "Black Widow", fortniteScorePerMatch: 865.5, fortniteKD: 2.69, fortniteWinRate: 8.76,
    duos: "Y", trios: "", squads: "Y", casual: "Y", ranked: "", competitions: "", exhibitions: "Y", funScale: 70, riskScale: 70},
    {squadsName: "Black Panther", apexName: "Black Panther", apexLevel: 6448, apexDamage: 8375,
    fortniteName: "Black Panther", fortniteScorePerMatch: 350.4, fortniteKD: 1.88, fortniteWinRate: 7.45,
    duos: "Y", trios: "Y", squads: "Y", casual: "Y", ranked: "Y", competitions: "", exhibitions: "Y", funScale: 30, riskScale: 30},
];


router.get("/fortnite", async function(req, res) {

    if (req.isAuthenticated()){

        let userStats = req.session.gameStats;
        let userPreferences = req.session.preferences;

        matchController.rank_matches(userStats, userPreferences, gameMatches, "Fortnite", (rankedMatches) => {

        res.render("match-report", {
            game: "Fortnite",
            matchList: rankedMatches});
        });
        
    } else {
        res.redirect("/signin");
    }
    
});

router.get("/apex-legends", (req, res) => {
    
    if (req.isAuthenticated()){

        let userStats = req.session.gameStats;
        let userPreferences = req.session.preferences;

        matchController.rank_matches(userStats, userPreferences, gameMatches, "Apex Legends", (rankedMatches) => {

        res.render("match-report", {
            game: "Apex Legends",
            matchList: rankedMatches});
        });
        
    } else {
        res.redirect("/signin");
    }
    
});

module.exports = router;