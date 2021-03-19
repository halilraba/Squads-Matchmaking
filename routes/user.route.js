const http = require('http');

const app = require('./app');

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log("Server has started successfully.")
});