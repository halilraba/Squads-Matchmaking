const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.send("<h1>Welcome to Squads Matchmatching!</h1>");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.");
});