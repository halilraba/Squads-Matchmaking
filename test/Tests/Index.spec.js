const { browser } = require("protractor");
var IndexPage = require('../Pages/Index.page.js');

describe('Index', () => {
    
    beforeEach(function(){
        browser.waitForAngularEnabled(false);
        browser.get('https://squads-test.herokuapp.com/');
    });

    it('should have correct page title', () => {
        //browser.sleep(5000);
       expect(browser.getTitle()).toEqual("Home Page");
       expect(IndexPage.welcomeText.getText()).toEqual("Welcome to the #1 matchmaking application for squads everywhere!");
    });

    it('should have correct welcome text', () => {
       expect(IndexPage.welcomeText.getText()).toEqual("Welcome to the #1 matchmaking application for squads everywhere!");
    });

    it('should have login text and should links to signin page', () => {
        expect(IndexPage.loginLink.getText()).toEqual("Log In");
        expect(IndexPage.loginLink.getAttribute("href")).toEqual("https://squads-test.herokuapp.com/signin");
     });

     it('should have signup text and should links to signup page', () => {
        expect(IndexPage.signupLink.getText()).toEqual("Sign Up");
        expect(IndexPage.signupLink.getAttribute("href")).toEqual("https://squads-test.herokuapp.com/signup");
     });

});