
const User = require(__dirname + "/models/user-model.js");

exports.addNewUser = function (firstName, lastName, email, birthDate, codName, fortniteName, password, fn) {

    const query = User.where({$or:[{email: email},{codName: codName},{fortniteName: fortniteName}]});
    query.findOne(function(err, user) {
        if (!err) {
            if (user) {
                fn(false);
            } else {
                const newUser = new User ({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthDate: birthDate,
                    codName: codName,
                    fortniteName: fortniteName,
                    password: password
                });
        
                newUser.save();
                        
                fn(true);
            }
        } else {
            console.log(err);
        }
    });
}

// exports.siValidation = function (email, password, fn) {
//     const query = User.where({email: email});
//     query.findOne(function(err, user) {
//         if (!err) {
//             if (user.password === password) {
//                 fn(user);
//             } else {
//                 fn(false);
//             }
//         } else {
//             console.log(err);
//         }
//     });
// }
