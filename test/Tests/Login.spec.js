const { browser } = require("protractor");
const { protractor } = require("protractor/built/ptor");
const IndexPage = require("../Pages/Index.page");
const LoginPage = require("../Pages/Login.page");


describe('Login ',()=>{

    
    beforeEach(function(){
        browser.waitForAngularEnabled(false);
        browser.get('https://squads-test.herokuapp.com/');
        IndexPage.loginLink.click();
    });

    it('should have correct page title', () => {
       expect(browser.getTitle()).toEqual("Sign In");
    });

    it('should have email input box and should be required', () => {
        expect(LoginPage.emailHeader.getText()).toEqual("Email Address");
        expect(LoginPage.emailInputBox.getAttribute("required")).toEqual('true');
     });

     it('should have password input box and should be required', () => {
        expect(LoginPage.passwordHeader.getText()).toEqual("Password");
        expect(LoginPage.passwordInputBox.getAttribute("required")).toEqual('true');
     });

     it('should have signup link to connect signup page', () => {
        expect(LoginPage.signupLink.getAttribute("href")).toEqual("https://squads-test.herokuapp.com/signup");
     });


});

describe('Login Functionalities',()=>{

    var EC = protractor.ExpectedConditions;
    beforeEach(()=>{
        browser.waitForAngularEnabled(false);
        browser.get('https://squads-test.herokuapp.com/');
        IndexPage.loginLink.click();
    });

    it('should have login button and should not allow user to login without putting credentials', () => {
        LoginPage.loginButton.click();
        expect(browser.getTitle()).toEqual("Sign In");
     });

     it('should not allow user to login without valid credentials', () => {
        LoginPage.emailInputBox.sendKeys("halil@gmail.com");
        LoginPage.loginButton.click();
        expect(browser.getTitle()).toEqual("Sign In");
        
        LoginPage.emailInputBox.clear();
        LoginPage.passwordInputBox.sendKeys("asdf");
        LoginPage.loginButton.click();
        expect(browser.getTitle()).toEqual("Sign In");

        LoginPage.emailInputBox.sendKeys("halil@gmail.com");
        LoginPage.loginButton.click();
        expect(browser.getTitle()).toEqual("Sign In");
     });


});