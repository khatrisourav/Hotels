const express  = require ("express");

const router =  express.Router();

const person = require("../models/person")

router.post ('/', async (req , res )=>{

    try {

        const data = req.body;

        const newperson = new person(data);


        const savedperson=   await newperson.save();

        console.log("data saved");

        res.status(200).json(savedperson);


    }
    catch(err){
      console.log(err);

       res.status(500).json(err);
    }
})

router.get('/', async (req, res )=>{

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



