const { browser } = require("protractor");
const { protractor } = require("protractor/built/ptor");
const IndexPage = require("../Pages/Index.page");
const SignupPage = require("../Pages/Signup.page");


describe('signup',()=>{


    beforeEach(function(){
        browser.waitForAngularEnabled(false);
        browser.get('https://squads-test.herokuapp.com/signup');

    });

    it('should have correct page title', () => {
       expect(browser.getTitle()).toEqual("Registration Page");
    });

    it('should have firstname input box and should be required', () => {
        expect(SignupPage.firstNameHeader.getText()).toEqual("First Name");
        expect(SignupPage.firstNameInputBox.getAttribute("required")).toEqual('true');
     });
    it('should have email input box and should be required', () => {
        expect(SignupPage.emailHeader.getText()).toEqual("Email");
        expect(SignupPage.emailInputBox.getAttribute("required")).toEqual('true');
     });
     it('should have squadsmatchmakingusername input box and should be required', () => {
             expect(SignupPage.squadsmatchmakingusername.getText()).toEqual("Squads Matchmaking Username");
             expect(SignupPage.squadsmatchmakingusernameInput.getAttribute("required")).toEqual('true');
          });



});

describe('Signup Functionalities',()=>{

    var EC = protractor.ExpectedConditions;
    beforeEach(()=>{
        browser.waitForAngularEnabled(false);
        browser.get('https://squads-test.herokuapp.com/signup');

    });



     it('should   allow user to signup  with valid values', () => {
        SignupPage.firstNameInputBox.sendKeys("Test_user"+ Math.floor(Math.random() * 20)+"@gmail.com");
        SignupPage.lastNameInputBox.sendKeys("lastname");
        SignupPage.emailInputBox.sendKeys("Test_user"+ Math.floor(Math.random() * 20)+"@gmail.com");
        SignupPage.birthdateInputBox.sendKeys("11/11/1999");
        SignupPage.squadsmatchmakingusernameInput.sendKeys("UserName"+Math.floor(Math.random() * 20));
        SignupPage.passwordInput.sendKeys("sdfsdf2342");
        SignupPage.submitButton.click();
        expect(browser.getTitle()).toEqual("Preferences Form");
     });


});
