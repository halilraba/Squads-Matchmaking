const chai = require("chai");
const expect = chai.expect;
const mongoose = require("mongoose");
const { db } = require("../models/users");
const User = require("../models/users");

// Fix Mongoose depreciation warning
// mongoose.Promise = global.Promise;

describe('file to test', ()=> {
    // Set up test database connection 
    before((done) => {
        mongoose.connect('mongodb://localhost:27017/users_test');
        mongoose.connection
        .once('open', ()=> { done(); })
        .on('error', (error) => {
            console.warn('Error', error);
        });
    });

    beforeEach((done)=> {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });
    context('function to test', ()=> {
        it('should_SaveUserToListsDB_When_NewUserCreated', ()=> {
            const newUser = new User ({
                name: "Brad", 
                password: "test123"
            });

            newUser.save();
            
            User.findOne({name: "Brad"}, (err, user)=> {
                expect(user.password).to.equal("test123");
            });
            // expect(User.findOne({name: "Brad"}).password).to.equal("test123");
        }) ;
    });
});

