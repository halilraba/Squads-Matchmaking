const chai = require("chai");
const expect = chai.expect;
const apiCalls = require("../../api-calls.js");
const GameStat = require("../../models/gamestat-model.js");
const request = require('supertest');


describe("API Calls", function() {
    it("should return Squadsname if user already exists", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "frodo9";
      let fortniteName = "fool-of-a-Took";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(apexName, fortniteName, squadsName, (apexData, fortniteData, squadsUser)=> {
          expect(squadsUser).to.not.be.null;
          resolve();
        });
      });

      await promise;
    });

    it("should return Squadsname = null if new user", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "gandalf";
      let fortniteName = "fool-of-a-Took";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(apexName, fortniteName, squadsName, (apexData, fortniteData, squadsUser)=> {
          expect(squadsUser).to.be.null;
          resolve();
        });
      });

      await promise;
    });

    it("should return Fortnite API data if Fortnite user exists", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "gandalf";
      let fortniteName = "fool-of-a-Took";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(apexName, fortniteName, squadsName, (apexData, fortniteData, squadsUser)=> {
          expect(fortniteData).to.not.be.null;
          resolve();
        });
      });

      await promise;
    });

    it("should not return Fortnite API data if Fortnite user does not exist", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "gandalf";
      let fortniteName = "xxx";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(apexName, fortniteName, squadsName, (apexData, fortniteData, squadsUser)=> {
          expect(fortniteData).to.be.null;
          resolve();
        });
      });

      await promise;
    });

    it("should return Apex API data if Apex user exists", async function() { 
      this.timeout(5000);
      this.slow(4000);
      let squadsName = "gandalf";
      let fortniteName = "xxx";
      let apexName = "Daltoosh";

      let promise = new Promise((resolve, reject) => {
        apiCalls.checkUserAccounts(apexName, fortniteName, squadsName, (apexData, fortniteData, squadsUser)=> {
          expect(apexData).to.not.be.null;
          resolve();
        });
      });

      await promise;
    });
});