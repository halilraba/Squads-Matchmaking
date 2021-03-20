// require('dotenv').config();
// process.env.TEST=true;
const chai = require("chai");
const expect = chai.expect;
// const app = require("../app.js");
const apiCalls = require("../api-calls.js");
// const User = require("../models/user-model.js");
const GameStat = require("../models/gamestat-model.js");
const request = require('supertest');


describe("API Calls", function() {
    // beforeEach(function(done) {
    //     newUser
    //     .post('/signup')
    //     .send(userRegistration)
    //     .expect(302)
    //     .expect('Location', '/')
    //     .set('Content-Type', 'application/x-www-form-urlencoded')
    //     .end(function(err, res){
    //         if (err) {
    //         console.log(err);
    //         } else {
    //         console.log("Test user added.");
    //         }
    //         done();
    //     });
    // });

    // afterEach(function(){
    //     User.deleteOne({email: 'mario@mushroom.com'}, function (err, result) { 
    //     if (err){ 
    //         console.log(err) 
    //     } else {
    //         console.log("Test user deleted.");
    //     }
    //     }); 
    // });

    it("should return Squadsname if user already exists", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "frodo9";
      let fortniteName = "fool-of-Took";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(fortniteName, squadsName, (fortniteData, squadsUser)=> {
          expect(squadsUser).to.not.be.null;
          resolve();
        });
      });

      await promise;
    });
});