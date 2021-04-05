require('dotenv').config();
process.env.TEST=true;
// const chai = require("chai");
// const expect = chai.expect;
// const chaiUrl = require("chai-url");
// const chaiHttp = require("chai-http");
const app = require("../../app.js");
const User = require("../../models/user-model.js");
const GameStat = require("../../models/gamestat-model.js");
const Preference = require('../../models/preferences-model');
const request = require('supertest');


const userRegistration = {
  email: 'frodo@bagend.com',
  fname: 'Frodo',
  lname: 'Baggins',
  bdate: '1920-04-01',
  squadsName: 'frodo9',
  apexName: 'Daltoosh',
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
      console.log("Test user deleted from users.");
    }
  }); 

  GameStat.deleteOne({email: 'frodo@bagend.com'}, function (err, result) { 
    if (err){ 
      console.log(err) 
    } else {
      console.log("Test user deleted from gamestats.");
    }
  }); 

  Preference.deleteOne({email: 'frodo@bagend.com'}, function (err, result) { 
    if (err){ 
      console.log(err) 
    } else {
      console.log("Test user deleted from preferences.");
    }
  }); 
});

describe("GET routes", function() {
  it("should get /index for root when user not logged in", function(done) { 
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

  it('should get /profile when user logged in', function(done){
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

  it("should get /index", function(done) {
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

  it("should get /signin", function(done) {
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

  it("should get /signup", function(done) {
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

  it("should get /preferences when user logged in", function(done) {
    authenticatedUser 
    .get("/preferences")
    .expect(200)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it("should redirect /preferences to /signin when user not logged in", function(done) {
    request(app) 
    .get("/preferences")
    .expect('Location', '/signin')
    .expect(302)
    .end(function(err, res) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

});

describe("POST routes", function() {
//   it("should get /signup when duplicate user email", function(done) {
//     let dupeEmail = {
//       email: 'frodo@bagend.com',
//       fname: 'Bilbo',
//       lname: 'Baggins',
//       bdate: '1900-04-01',
//       squadsName: 'bilbo1',
//       codName: '',
//       fortniteName: '',
//       password: 'trolls'
//     }

//     newUser
//     .post('/signup')
//     .send(dupeEmail)
//     .expect(302)
//     .expect('Location', '/signup')
//     .set('Content-Type', 'application/x-www-form-urlencoded')
//     .end(function(err, res){
//       if (err) {
//         return done(err);
//       }
//       return done();
//     });
//   });
  
//   it("should get /signup when duplicate Squads username", function(done) {
//     let dupeSquadsName = {
//       email: 'bilbo@bagend.com',
//       fname: 'Bilbo',
//       lname: 'Baggins',
//       bdate: '1900-04-01',
//       squadsName: 'frodo9',
//       codName: '',
//       fortniteName: '',
//       password: 'trolls'
//     }

//     newUser
//     .post('/signup')
//     .send(dupeSquadsName)
//     .expect(302)
//     .expect('Location', '/signup')
//     .set('Content-Type', 'application/x-www-form-urlencoded')
//     .end(function(err, res){
//       if (err) {
//         return done(err);
//       }
//       return done();
//     });
//   });

  it("should redirect /preferences POST to /profile", function(done) {
    let newPreferences = {
      email: 'frodo@bagend.com',
      duos: "Y",
      trios: "Y",
      squads: "Y",
      casual: "Y",
      ranked: "Y",
      competitions: "Y",
      exhibitions: "Y",
      funScale: 40,
      riskScale: 60
    }

    authenticatedUser 
    .post('/preferences')
    .send(newPreferences)
    .expect(302)
    .expect('Location', '/profile')
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
    User.findOne({email: 'frodo@bagend.com'}, (err, user) => {
      if (err) {throw err;}
      if (user.length === 0) {throw new Error('No data!');}
      done();
    }); 
  });

  it("should create a gamestats document when user registers with fortnite or cod username", function(done) {
    GameStat.findOne({email: 'frodo@bagend.com'}, (err, gamestat) => {
      if (err) {throw err;}
      if (gamestat.length === 0) {throw new Error('No data!');}
      done();
    }); 
  });

  it("should create a preferences document when POST completed", function(done) {
    Preference.findOne({email: 'frodo@bagend.com'}, (err, pref) => {
      if (err) {throw err;}
      if (pref.length === 0) {throw new Error('No data!');}
      done();
    }); 
  });
  
});