const express = require("express");
const app = express();
const db = require("./db");
const person = require("./models/person");

const bodyparser= require("body-parser");
const passport = require("./auth");


const regist = require ("./models/registration")
require('dotenv').config();



//app.use(passport.initialize());

const logrequest = (req,res,next)=>{
console.log(`[${new Date().toLocaleDateString()}] request made to :-${req.originalUrl}`);
next();

}
app.use(bodyparser.json());
app.use(logrequest);

const PORT = process.env.PORT ||3000

app.listen(PORT, () => {
console.log("server is running");
});
console.log("start");




//const localautorized =  passport.authenticate('local',{session:false});


app.get('/', function (req ,res){
    res.send("Welcome to my hotel")
})

const personroutes= require("./rounter/personroute");

app.use('/person',personroutes);







