const express = require("express");
const StatusService = require("./categories-service");

const StatusRouter = express.Router();
const jsonParser = express.json();

StatusRouter.route("/")
    .get((req, res, next) => {
        const knexInstance = req.app.get("db");

        // RETURN ALL STATUS ENTRIES

        StatusService.addStatus(knexInstance, status, clientid, securityitem)
            .then((results) => res.status(200).json(results))
            .catch(next);
    })