const mongoose = require('mongoose');
const Preference = require('../models/preferences-model');

exports.createPlayerPreferences = (req, res) => {
        
    const playerPreferences = new Preference({
        email: req.session.email,
        duos: req.body.duos,
        trios: req.body.trios,
        squads: req.body.squads,
        casual: req.body.casual,
        ranked: req.body.ranked,
        competitions: req.body.competitions,
        exhibitions: req.body.exhibitions,
        funScale: req.body.funScale,
        riskScale: req.body.riskScale
    });
    
    playerPreferences
        .save()
        .then(result => {

            res.redirect('/profile')
            // res.status(201).json({
            //     message: 'Player preferences successfully added',
            //     createdPreferences:{
            //         numberOfPlayers: result.numberOfPlayers,
            //         rankingMode:result.rankingMode,
            //         playMode: result.playMode,
            //         competitionMode: result.competitionMode,
            //         riskMode: result.riskMode,
            //         _id: result._id,

            //         request:{
            //             type:'POST',
            //             url:'/preferences' + result._id
            //         }
            //     }
               
            // });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}

exports.getPlayerPreferences = (req, res) => {

    if (req.isAuthenticated()){
        // res.sendFile(__dirname + '/../views/preferences-form.html');
        res.sendFile('preferences-form.html', {'root': './views'});
    } else {
        res.redirect("/signin");
    }

}