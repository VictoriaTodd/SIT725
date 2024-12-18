let express = require('express');

function createRouter(controller) {
    let router = express.Router();

    router.post('/', function (req, res) {
        controller.postPerson(req, res);
    });

    router.get('/', (req, res) => {
        controller.getAllPeople(req, res);
    });

    return router;
}

module.exports = createRouter;