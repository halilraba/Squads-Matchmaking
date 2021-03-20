require('dotenv').config();
process.env.TEST=true;
// const chai = require("chai");
// const expect = chai.expect;
// const chaiUrl = require("chai-url");
// const chaiHttp = require("chai-http");
const app = require("../app.js");
const User = require("../models/user-model.js");
const GameStat = require("../models/gamestat-model.js");
const request = require('supertest');


const userRegistration = {
  email: 'frodo@bagend.com',
  fname: 'Frodo',
  lname: 'Baggins',
  bdate: '1920-04-01',
  squadsName: 'frodo9',
  codName: '',
  fortniteName: 'fool-of-a-Took',
  password: 'test123'
}

const userCredentials = {
  email: 'frodo@bagend.com', 
  password: 'test123'
}

var authenticatedUser = request.agent(app);
var newUser = request.agent(app);

before(function(done) {
  this.timeout(5000);
  newUser
  .post('/signup')
  .send(userRegistration)
  
  .expect(302)
  .expect('Location', '/preferences')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .end(function(err, res){
    if (err) {
      console.log(err);
    } else {
      console.log("Test user added.");
    }
    done();
  });
});

before(function(done){
  this.timeout(5000);
  authenticatedUser
  .post('/signin')
  .send(userCredentials)
  .expect(302)
  .expect('Location', '/')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .end(function(err, res){
    if (err) {
      console.log(err);
    } else {
      console.log("Test user signed in.");
      console.log(" ");
    }
    done();
  });
});

after(function(){
  User.deleteOne({email: 'frodo@bagend.com'}, function (err, result) { 
    if (err){ 
      console.log(err) 
    } else {
      console.log("Test user deleted.");
    }
  }); 
});

describe("GET routes", function() {
  it("should return /index for root when user not logged in", function(done) { 
    request(app)
    .get("/")
    .expect('Location', '/index')
    .expect(302)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done(); 
    });
  });

  it("should redirect root to /profile when user logged in", function(done) { 
    authenticatedUser
    .get("/")
    .expect('Location', '/profile')
    .expect(302)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done(); 
    });
  });

  it('should redirect /profile to /signin when user not logged in', function(done){
    request(app)
    .get('/profile')
    .expect('Location', '/signin')
    .expect(302)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it('should return /profile when user logged in', function(done){
    authenticatedUser
    .get('/profile')
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it("should return landing page on /index", function(done) {
    request(app) 
    .get("/index")
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it("should return signin page on /signin", function(done) {
    request(app) 
    .get("/signin")
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it("should return registration page on /signup", function(done) {
    request(app) 
    .get("/signup")
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

});

describe("POST routes", function() {
  it("should return /signup when duplicate user email", function(done) {
    let dupeEmail = {
      email: 'frodo@bagend.com',
      fname: 'Bilbo',
      lname: 'Baggins',
      bdate: '1900-04-01',
      squadsName: 'bilbo1',
      codName: '',
      fortniteName: '',
      password: 'trolls'
    }

    newUser
    .post('/signup')
    .send(dupeEmail)
    .expect(302)
    .expect('Location', '/signup')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
      if (err) {
        return done(err);
      }
      return done();
    });
  });
  
  it("should return /signup when duplicate Squads username", function(done) {
    let dupeSquadsName = {
      email: 'bilbo@bagend.com',
      fname: 'Bilbo',
      lname: 'Baggins',
      bdate: '1900-04-01',
      squadsName: 'frodo9',
      codName: '',
      fortniteName: '',
      password: 'trolls'
    }

    newUser
    .post('/signup')
    .send(dupeSquadsName)
    .expect(302)
    .expect('Location', '/signup')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .end(function(err, res){
      if (err) {
        return done(err);
      }
      return done();
    });
  });
});


describe("User Documents", function() {
  it("should create a users document when user registers", function(done) {
    User.findOne({email: 'frodo@bagend.com'}, (err, name) => {
      if (err) {throw err;}
      if (name.length === 0) {throw new Error('No data!');}
      done();
    }); 
  });

  it("should create a gamestats document when user registers with fortnite or cod username", function(done) {
    GameStat.findOne({squadsName: 'frodo9'}, (err, name) => {
      if (err) {throw err;}
      if (name.length === 0) {throw new Error('No data!');}
      done();
    }); 
  });
  
});