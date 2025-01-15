let collection = require('../models/person');

const postPerson = (req,res) => {
    let person = req.body;
    collection.postPerson(person, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllPeople = (req,res) => {
    collection.getAllPeople((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

module.exports = {postPerson,getAllPeople}