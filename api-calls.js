require('dotenv').config();
const https = require("https");
const crud = require(__dirname + "/crud.js");


exports.checkUserAccounts = async function (apexName, fortniteName, squadsName, callback) {
    
    // Check if Squads user name already exists 
    const squadsUser = await crud.checkSquadsUsernameExists(squadsName);
    
    // Check if Apex Legends user exists by getting Apex Legends Game Data
    var apexData = true;
    if (apexName) {
        apexData = await getApexLegendsData(apexName);
        // console.log(apexData);
    } 

    // Check if Fortnite user exists by getting Fortnite Game Data 
    var fortniteData = true;
    if (fortniteName) {
        fortniteData = await getFortniteData(fortniteName);
    }

    // Return whether fortnite user !exist or squads user already exists 
    callback(apexData, fortniteData, squadsUser);
}


async function getFortniteData(fortniteName) {

    var fortniteURL;
    var accountType = ["epic","psn","xbl"];
    let fortniteData = {};

    for (i = 0; i < 3; i++) {

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

    var accountType = ["origin","psn","xbl"];
    let apexData = {};

    for (i = 0; i < 3; i++) {

        let promise = new Promise((resolve, reject) => {

            let apexHost = "https://public-api.tracker.gg/v2/apex/standard/profile";
            let apexPath = '/' + accountType[i] + '/' + apexName;
            let apexKey = '?TRN-Api-Key=' + process.env.API_KEY;
            let apexURL = apexHost + apexPath + apexKey;

            // console.log("i = " + i)
            // console.log(apexURL);
                
            https.get(apexURL, (response) => {

                if (response.statusCode === 200) {
                    let result = '';

                    response.on("data", (data) =>{
                        result += data;
                    });

                    response.on('end', () => {                       
                        let apexParse = JSON.parse(result);

                        // console.log(apexParse);

                        apexData.apexName = apexName;
                        apexData.level = apexParse.data.segments[0].stats.level.value;
                        let apexStats = apexParse.data.metadata.activeLegendStats; 
                        if (apexStats) {
                            if (apexStats.includes("Kills")) {
                                apexData.kills = apexParse.data.segments[0].stats.kills.value;
                            }
                            if (apexStats.includes("Damage")) {
                                apexData.damage = apexParse.data.segments[0].stats.damage.value;
                            }
                        }

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

