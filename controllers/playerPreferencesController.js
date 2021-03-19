const mongoose = require('mongoose');
const PlayerPreferences = require('/Users/dicksondiku/Documents/SQUAD_MATCHMAKING/Squads-Matchmaking/models/preferences-model');

exports.createPlayerPreferences = (req, res) => {
        
    const playerPreferences = new PlayerPreferences({
        _id: new mongoose.Types.ObjectId(),
        numberOfPlayers: req.body.numberOfPlayers,
        rankingMode:req.body.rankingMode,
        playMode: req.body.playMode,
        competitionMode: req.body.competitionMode,
        riskMode: req.body.riskMode

    });
    
    playerPreferences
        .save()
        .then(result => {
            console.log(result);
            //res.redirect('/preferences')
            res.status(201).json({
                message: 'Player preferences successfully added',
                createdPreferences:{
                    numberOfPlayers: result.numberOfPlayers,
                    rankingMode:result.rankingMode,
                    playMode: result.playMode,
                    competitionMode: result.competitionMode,
                    riskMode: result.riskMode,
                    _id: result._id,

                    request:{
                        type:'POST',
                        url:'http://localhost:3000/preferences' + result._id
                    }
                }
               
            });
        })
        .catch(err => {
            console.log(err);
        res.status(500).json({error: err});
    });
}
