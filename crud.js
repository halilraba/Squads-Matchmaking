
const User = require(__dirname + "/models/user-model.js");

exports.verifyUserNames = function (squadsName, codName, fortniteName, fn) {
    const query = User.where({$or:[{squadsName: squadsName},{codName: codName},{fortniteName: fortniteName}]});
    query.findOne(function(err, user) {
        if (!err) {
            fn(user);
        } else {
            console.log(err);
        }
    });
}


