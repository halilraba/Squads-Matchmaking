const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.write("<h1>Welcome to Squads Matchmatching!</h1>");
    res.write("<p>Your best team is coming soon...</p>")
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.");
});