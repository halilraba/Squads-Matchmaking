const https = require("https");
const crud = require(__dirname + "/crud.js");


exports.checkUserAccounts = async function (fortniteName, squadsName, callback) {
    
    // Check if Squads user name already exists 
    const squadsUser = await crud.checkSquadsUsernameExists(squadsName);
    
    // Check if Fortnite user exists by getting Fortnite Game Data 
    var fortniteData = true;
    if (fortniteName) {
        fortniteData = await getFortniteData(fortniteName);
    }

    callback(fortniteData, squadsUser);
}


async function getFortniteData(fortniteName) {

    var fortniteURL;
    const accountType = ["epic","psn","xbl"];
    let fortniteData = {};

    for (i = 0; i < 2; i++) {

        let promise = new Promise((resolve, reject) => {
            
            fortniteURL = "https://fortnite-api.com/v1/stats/br/v2?name=" + fortniteName + "&accountType=" + accountType[i];
                
            https.get(fortniteURL, (response) => {

                if (response.statusCode === 200) {
                    let result = '';

                    response.on("data", (data) =>{
                        result += data;
                    });

                    response.on('end', () => {                       
                        let fortniteParse = JSON.parse(result);

                        fortniteData.scorePerMatch = fortniteParse.data.stats.all.overall.scorePerMatch;
                        fortniteData.kd = fortniteParse.data.stats.all.overall.kd;
                        fortniteData.winRate = fortniteParse.data.stats.all.overall.winRate;

                        resolve(true);
                    });        
                } else {
                    resolve(false);
                }
            });
        });

        let result = await promise;
        if (result === true) {
            return fortniteData;
        }
    }

    if (Object.keys(fortniteData).length === 0) {
        return null;
    }
    
}

