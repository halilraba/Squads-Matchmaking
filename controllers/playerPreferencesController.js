const mongoose = require('mongoose');
const Preference = require(__dirname + './../models/preferences-model');

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
            // console.log(result);
            res.redirect('/profile')
            // res.status(201).json({
            //     // message: 'Player preferences successfully added',
            //     // createdPreferences:{
            //     //     numberOfPlayers: result.numberOfPlayers,
            //     //     rankingMode:result.rankingMode,
            //     //     playMode: result.playMode,
            //     //     competitionMode: result.competitionMode,
            //     //     riskMode: result.riskMode,
            //     //     _id: result._id,

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




/**
 * Function to retrieve a user profile by email address
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getPreferenceByEmail = (req, res) => {
    const useremail = req.params.email;

    Preference.find({email:useremail})
    .then((doc)=>{
       console.log(doc);
       //res.send(doc);
       res.render(__dirname + "/../views/user-profile-stats",{Preference:Preference});
       
    })
   .catch((err)=>{
       console.log(err);
   });
}

/**
 * Function to get all users profiles
 * @param {*} res 
 * @param {*} req 
 */

exports.getPlayersPreferences = (req, res) => {
   // const em = req.params.email;

    Preference.find()
    .exec()
    .then((doc)=>{
       console.log(doc);
       res.send(doc);
    })
   .catch((err)=>{
       console.log(err);
       res.status(500).json({error: err});
   });
}





// exports.getPlayersPreferences = (res, req) => {
    
//     playerPreferences.find()
//     //.select(' numberOfPlayers rankingMode playMode competitionMode riskMode _id')
//     .exec()
//     .then( docs => {
//         const response = {
//             count: docs.length,
//             playerPreferences: docs.map(doc => {
//                 return{
//                     numberOfPlayers: doc.numberOfPlayers,
//                     rankingMode: doc.rankingMode,
//                     playMode: doc.playMode,
//                     competitionMode: doc.competitionMode,
//                     riskMode: doc.riskMode,
//                     _id: doc._id,
//                     request:{
//                         type:'GET',
//                         url:'http://localhost:3000/get_preferences' + doc._id
//                     }

//                 }
//             })
//         }
//         console.log(docs);
//             // res.status(200).json(response);
//     })
//     .catch(err => {
//         console.log(err);
//     // res.status(500).json({error: err}
//     //     );
//     });
// }

// exports.getPreferenceByEmail =  (req, res, next) => {
//     const email = req.session.email; 
//     //const email = req.body.email;
//     Preference.findOne(email)
//         // .select('email, duos, trios, squads, casual, ranked, competitions, exhibitions, funScale, riskScale email')
//         .exec()
//         .then(doc => {

//             console.log('From database' + doc);
//             if (doc){
//                 res.status(200).json({
//                     preference: doc,
//                     request:{
//                         type:'GET',
//                         url: 'http://localhost/preferences/getPreferenceById'
//                     }
//                 });
//             }
//             else{
//                 res.status(404).json({message: 'No valid entry found for provided ID'});
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({error: err});
//         });
// }