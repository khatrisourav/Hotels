const express = require("express");
const app = express();
const db = require("./db");
const person = require("./models/person");

const bodyparser= require("body-parser");

const regist = require ("./models/registration")

app.use(bodyparser.json());




app.listen(3000, () => {
console.log("server is running");
});
console.log("start");

app.get('/', function (req ,res){
    res.send("Welcome to my hotel")
})

const personroutes= require("./rounter/personroute");

app.use('/person',personroutes);







