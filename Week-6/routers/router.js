let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    controller.postPerson(req,res);
});

router.get('/', (req,res)=>{
    controller.getAllPeople(req,res);
});


module.exports = router;