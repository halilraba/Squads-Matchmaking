require('dotenv').config();
const https = require("https");
const crud = require(__dirname + "/crud.js");


exports.checkUserAccounts = async function (apexName, fortniteName, squadsName, callback) {
    
    // Check if Squads user name already exists 
    const squadsUser = await crud.checkSquadsUsernameExists(squadsName);
    
    // Check if Apex Legends user exists by getting Apex Legends Game Data
    if (apexName) {
        let apexData = await getApexLegendsData(apexName);
        console.log(apexData);
    } 

    // Check if Fortnite user exists by getting Fortnite Game Data 
    var fortniteData = true;
    if (fortniteName) {
        let fortniteData = await getFortniteData(fortniteName);
    }

    // Return whether fortnite user !exist or squads user already exists 
    callback(apexData, fortniteData, squadsUser);
}


async function getFortniteData(fortniteName) {

    var fortniteURL;
    var accountType = ["epic","psn","xbl"];
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

                        fortniteData.fortniteName = fortniteName;
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

async function getApexLegendsData(apexName) {

    var apexOptions = {};
    var accountType = ["origin","psn","xbl"];
    let apexData = {};

    for (i = 0; i < 2; i++) {

        let promise = new Promise((resolve, reject) => {
            
            apexOptions = {
                hostname: 'https://public-api.tracker.gg/v2/apex/standard/profile',
                // port: 443,
                path: '/' + accountType[i] + '/' + apexName,
                method: 'GET',
                Accept: application/json,
                "Accept-Encoding" : gzip,
                "TRN-Api-Key" : process.env.API_KEY 
              };
                
            https.request(apexOptions, (response) => {

                if (response.statusCode === 200) {
                    let result = '';

                    response.on("data", (data) =>{
                        result += data;
                    });

                    response.on('end', () => {                       
                        let apexParse = JSON.parse(result);

                        console.log(apexParse);

                        apexData.apexName = apexName;
                        apexData.level = apexParse.data.segments.stats.level;
                        apexData.kills = apexParse.data.segments.stats.kills;
                        apexData.damage = apexParse.data.ssegments.stats.damage;

                        resolve(true);
                    });        
                } else {
                    resolve(false);
                }
            });
        });

        let result = await promise;
        if (result === true) {
            return apexData;
        }
    }

    if (Object.keys(apexData).length === 0) {
        return null;
    }
    
}

