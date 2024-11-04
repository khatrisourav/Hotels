const mongoose = require("mongoose");


//connectURL

const mongourl = 'mongodb://localhost:27017/hotels';


//establish commection

mongoose.connect(mongourl , {

   
   
})

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
