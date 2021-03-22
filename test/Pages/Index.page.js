
var IndexPage = function(){
    
    this.welcomeText=$('body > h1 > center');
    this.loginLink = $('body > div > button:nth-child(1) > a');
    this.signupLink = $('body > div > button:nth-child(2) > a');

};

module.exports = new IndexPage();