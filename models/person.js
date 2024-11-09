const mongoose= require("mongoose");

const bcrypt = require("bcrypt");

const personschema= new mongoose.Schema({

    name :{
        type : String,
        required: true
    },

    age :{
        type :Number

    },

    work : {
        type : String,
        enum : ["chef", "manager", "owner"],
        required : true
    },

    mobile :{
        type : String,
      required : true  
    }
    ,

    email:{
        type : String,
        required : true,
        unique: true
    },

    address : {
        type : String,
        required : true,

    },

    salary : {
       type : Number,
      required : true   
    },

    username : {
required : true,
type : String
    },

    password :{

        required : true,
        type : String
    },



})
//comment

personschema.pre('save', async function(next){
    const person = this;
    if(!person.isModified('password'))  {
        return next();
    }

    try {

        const salt = await bcrypt.genSalt(10);

        const hashedpassword= await bcrypt.hash(person.password, salt);

        person.password= hashedpassword;


        next();

    }

    catch(err){

return next(err);
    }

})

personschema.methods.comparepassword= async function(candidatepass){

    try {
        const ismatch =   await bcrypt.compare(candidatepass,this.password)

        if(ismatch){
            return ismatch
        }

    }
    catch (err){
throw err
    }
}

const person = mongoose.model('person', personschema);

module.exports = person;
