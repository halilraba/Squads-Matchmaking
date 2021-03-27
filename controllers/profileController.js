const crud = require(__dirname + "./../crud.js");

exports.get_user_profile = function(req, res) {
    
    if (req.isAuthenticated()){
        let email = req.session.email;
        crud.findProfileData(email, (squadsName, gameStats, preferences)=> {
            
            res.render("user-profile-stats", {
                squadsName: squadsName,
                fortniteName: gameStats.fortniteName,
                scorePerMatch: gameStats.fortniteScorePerMatch,
                winRate: gameStats.fortniteWinRate, 
                killRatio: gameStats.fortniteKD, 
                apexName: gameStats.apexName,
                level: gameStats.apexLevel, 
                kills: gameStats.apexKills, 
                damage: gameStats.apexDamage, 
                duos: preferences.duos, 
                trios: preferences.trios, 
                squads: preferences.squads, 
                casual: preferences.casual, 
                ranked: preferences.ranked, 
                competitions: preferences.competitions, 
                exhibitions: preferences.exhibitions, 
                fcScale: preferences.funScale,  
                rcScale: preferences.riskScale});

        });
    } else {
        res.redirect("/signin");
    }
};