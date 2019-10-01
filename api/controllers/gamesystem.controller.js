'use strict';

var controllerHelper = require('../helpers/controller.helper');

const {Gamesystems} = require('../models');

// Module Name
const MODULE_NAME = '[GameSystem Controller]';

// Error Messages
const GS_CT_ERR_GAMESYSTEM_NOT_FOUND = 'Game system not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Game system deleted successfully';

function getGameSystems(req, res) {
    try {

        console.log("fetching...");
        console.log(Gamesystems);

        Gamesystems.findAll({
            //include: [{model: orderstatus}],
            //include: [{all: true, nested: true}]
        }).then((consoles) => {
            console.log(consoles);
            console.log("");
            res.status(200).send(consoles);
            //utils.writeJson(res, consoles);
        }, (error) => res.status(500).send(error));

    } catch (error) {
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystems.name, error, res);
    }
}

function createGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const parameters = req.body;

        console.log("Insert...");
        console.log("params... " + parameters);

        return Gamesystems.create({
                name: parameters.name,
                description: parameters.description,
        }).then(gameSystems => res.status(201).send(gameSystems))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createGameSystem.name, error, res);
    }

}

function getGameSystemById(req, res) {
    try {
        const id = req.swagger.params.id.value;

        Gamesystems.findByPk(id).then(gameSystem => res.status(200).send(gameSystem));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameSystemById.name, error, res);
    }
}

function deleteGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    const id = req.swagger.params.id.value;

    Gamesystems.findByPk(id).then(gameSystem => {
        if (!gameSystem) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return gameSystem.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => res.status(403).send(error));
}

function updateGameSystem(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type'); // If needed
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        const id = req.swagger.params.id.value;
        const parameters = req.body;

        console.log("params : " + id);
        console.log("update gamesystems ... " + parameters.name + " " + parameters.description);

        Gamesystems.findByPk(id).then(gameSystem => {
                console.log("Result of findById: " + gameSystem);
                if (!gameSystem) {
                    res.status(401).send(({}));
                }

                return gameSystem.update({
                        name: parameters.name,
                        description: parameters.description
                    })
                    .then(() => res.status(200).send(gameSystem))
                    .catch(error => res.status(403).send(gameSystem));
            }).catch(error => {
                console.log("There was an error: " + error);
                // resolve(error);
            });

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateGameSystem.name, error, res);
    }
}


module.exports =
{
    getGameSystems,
    getGameSystemById,
    createGameSystem,
    updateGameSystem,
    deleteGameSystem,
    GS_CT_ERR_GAMESYSTEM_NOT_FOUND,
    GS_CT_DELETED_SUCCESSFULLY,
    MODULE_NAME
};