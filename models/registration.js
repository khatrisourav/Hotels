const mongoose = require("mongoose");

const registration = mongoose.Schema({
    login :{
        type: String,
        required :true
    },
    password :{
        type : String,
        requires: true,

    }
})

const regist= mongoose.model('regist', registration);

module.exports = regist;
