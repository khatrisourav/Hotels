
41
const express  = require ("express");

const router =  express.Router();

const person = require("../models/person");
const { generatetoken,jsonauthmiddleware } = require("./../jsonauth");

router.post ('/signup', async (req , res )=>{

    try {

        const data = req.body;

        const newperson = new person(data);


        const savedperson=   await newperson.save();


        console.log("data saved");


        const payload={
            id: savedperson.id,
            username: savedperson.username,
        }

        const token = generatetoken(payload);

        res.status(200).json({savedperson:savedperson,token:token});


    }
    catch(err){
      console.log(err);

       res.status(500).json(err);
    }
})


router.post('/login', async(req,res)=>{

try {

    const { username, password} = req.body;

    const user = await person.findOne({username: username});


    if (!user || !(await user.comparepassword(password))){
        return res.status(401).json({error: "shi kar code bhai login route ko  password or username galat hai "});
    }

    const payload = {

        id : req.id,
        username: req.username
    }

    const token = generatetoken(payload);

    res.status(201).json(token);

}
catch(err){
console.log(err);
res.status(500).json({error: "kar abb agya error catch block me "})















}


})

router.get('/signup', async (req, res )=>{

    try {

        const data = await person.find();
        console.log("data fetched");

        res.status(200).json(data);

    }
    catch(err){
        console.log(err);

        res.status(500).json(err);

    }
})


router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;

        if (worktype == 'chef' || worktype =='manager' || worktype == 'owner') {
            const data = await person.find({ work: worktype });

            console.log("Data fetched");
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req,res)=>{


    try {

        const personid = req.params.id;

    const updateddata = req.body;

    const response = await person.findByIdAndUpdate(personid , updateddata);

    if(!response){
        res.status(404).json({error : 'person not found'})
    }

    console.log ("data updated");

    res.status(200).json(response);
    }
    catch (err){
        console.log(err);

        res.status(500).json(err);
    }
    
})


router.delete('/:id', async (req,res)=>{

    try{

        const personid = req.params.id;

        const response= await person.findByIdAndDelete(personid);
         
        if(!response){
            res.status(404).json({error : 'person not found'})
        }

        console.log("data deleted");

        res.status(200).json({suc: 'deleted'});
        
    }
    catch(err){
        console.log(err);

        res.status(500).json(err);
    }
})

module.exports= router;