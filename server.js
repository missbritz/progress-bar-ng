var express = require('express');
var app = express();
var path = require('path');
port = process.argv[2] || 3000;

app.use("/css", express.static(__dirname + '/public/css')); 
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/js", express.static(__dirname + '/dist/js'));
app.use("/", express.static(__dirname + '/public'));

app.listen(port); //the port you want to use
console.log("Express server running");

