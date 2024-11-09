const passport = require("passport");


const localstrategy = require('passport-local').Strategy;

const person = require("./models/person");



passport.use(new localstrategy(async( user, pass , done)=>{



    try {


    console.log("receieved credential", user , pass)
    const users = await person.findOne({username:user});
    

    if(!users){
        return done(null , false , {message :'incorrect username'});

    }


    const ispass =  users.comparepassword(pass);

    if (ispass){
        return done(null, users);

    }
    
    else {
        return done(null , false , {message : 'incorrect passwrd'});
    }

}

catch(err){
    return done(err);
    console.log(err);

}

}
)
)


module.exports = passport;