const chai = require("chai");
const expect = chai.expect;
const apiCalls = require("../../api-calls.js");
const crud = require("../../crud.js");
const GameStat = require("../../models/gamestat-model.js");
const request = require('supertest');


describe("Database Queries", function() {

    it("should find gamestats document if exists", async function() { 
        this.timeout(5000);
        this.slow(4000);

        let email = 'frodo@bagend.com';

        await crud.findProfileData(email, (squadsName, gameStats, preferences)=> {
            expect(gameStats).to.not.be.null;
        });
    });
});