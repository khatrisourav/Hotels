const express = require("express");
const app = express();
const db = require("./db");
const person = require("./models/person");

const bodyparser= require("body-parser");

const regist = require ("./models/registration")
require('dotenv').config();


app.use(bodyparser.json());


const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
console.log("server is running");
});
console.log("start");

app.get('/', function (req ,res){
    res.send("Welcome to my hotel")
})

const personroutes= require("./rounter/personroute");

app.use('/person',personroutes);







