var SignupPage = function(){

    this.firstNameHeader=$('body > div > form > label:nth-child(1) > b');
    this.firstNameInputBox=$('body > div > form > input[type=text]:nth-child(2) ');
    this.emailHeader=$('body > div > form > label:nth-child(5) > b');
    this.emailInputBox = $('body > div > form > input[type=email]:nth-child(6)');
     this.squadsmatchmakingusername=$('body > div > form > label:nth-child(9) > b');
     this.squadsmatchmakingusernameInput = $('body > div > form > input[type=text]:nth-child(10)');
 


};

module.exports = new SignupPage();