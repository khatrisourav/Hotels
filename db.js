const mongoose = require("mongoose");


//connectURL
require('dotenv').config();


const mongourl = 'mongodb://localhost:27017/hotels';
//const mongourl = process.env.MONGOURL;


//establish commection

// mongoose.connect(mongourl , {

   
   
// })
mongoose.connect(mongourl);

//obbject for responsible for connnection 

const db = mongoose.connection ;


db.on('connected',()=>{

    console.log("connected mongo");
})

db.on('error',(err)=>{

    console.error("error  mongo", err);
})

db.on('disconnected',()=>{

    console.log("disconnected mongo");
})


module.exports  = db;
