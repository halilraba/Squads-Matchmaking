var LoginPage = function(){
    
    this.emailHeader=$('body > div > form > label:nth-child(1) > b');
    this.emailInputBox = $('body > div > form > input[type=email]:nth-child(2)');
    this.passwordHeader = $('body > div > form > label:nth-child(3) > b');
    this.passwordInputBox = $('body > div > form > input[type=password]:nth-child(4)');
    this.signupLink = $('body > form > div > span > a');
    this.loginButton = $('body > div > form > button');
    
    
};

module.exports = new LoginPage();