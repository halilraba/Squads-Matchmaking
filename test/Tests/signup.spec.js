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
//
//     it('should have password input box and should be required', () => {
//        expect(SignupPage.passwordHeader.getText()).toEqual("Password");
//        expect(SignupPage.passwordInputBox.getAttribute("required")).toEqual('true');
//     });
//
//     it('should have signup link to connect signup page', () => {
//        expect(SignupPage.signupLink.getAttribute("href")).toEqual("https://squads-test.herokuapp.com/signup");
//     });


});
