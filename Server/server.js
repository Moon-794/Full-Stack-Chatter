const express = require("express");
const http = require("http");

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => 
{
    console.log("Request recieved.");
    res.send();
});

server.listen(port, () => {console.log("Server Initialised on port: " + port)});