const mongoose = require('mongoose');
<<<<<<< HEAD
const PlayerPreferences = require(__dirname + './../models/preferences-model');
=======
const Preference = require('../models/preferences-model');
>>>>>>> fd4dd2f3fb7e5939eead7b1217950894ace7d0d2

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
        riskScale:req.body.riskScale
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

<<<<<<< HEAD

exports.getPlayersPreferences = (res, req) => {
    
    PlayerPreferences.find()
    .select(' numberOfPlayers rankingMode playMode competitionMode riskMode_id')
    .exec()
    .then( docs => {
        const response = {
            count: docs.length,
            playerPreferences: docs.map(doc => {
                return{
                    numberOfPlayers: doc.numberOfPlayers,
                    rankingMode: doc.rankingMode,
                    playMode: doc.playMode,
                    competitionMode: doc.competitionMode,
                    riskMode: doc.riskMode,
                    _id: doc._id,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/get_preferences' + doc._id
                    }

                }
            })
        }
        console.log(docs);
            // res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
    // res.status(500).json({error: err}
    //     );
    });
}

=======
exports.getPlayerPreferences = (req, res) => {

    if (req.isAuthenticated()){
        // res.sendFile(__dirname + '/../views/preferences-form.html');
        res.sendFile('preferences-form.html', {'root': './views'});
    } else {
        res.redirect("/signin");
    }

}
>>>>>>> fd4dd2f3fb7e5939eead7b1217950894ace7d0d2
