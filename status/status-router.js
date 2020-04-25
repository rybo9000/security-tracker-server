const express = require("express");
const StatusService = require("./status-service");

const StatusRouter = express.Router();
const jsonParser = express.json();

StatusRouter.route("/")
  .get((req, res, next) => {
    const { id } = req.query;

    const knexInstance = req.app.get("db");

    // RETURN ALL STATUS ENTRIES

    StatusService.getStatus(knexInstance)
      .then((results) => {
        let response = results;
        if (id) {
          response = response.filter((itm) => itm.clientid === Number(id));
        }
        return res.status(200).json(response);
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    let { id, value } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required!" });
    }

    // if (!value) {
    //     return res.status(400).json({ error: "Value is required!" });
    // }

    const knexInstance = req.app.get("db");

    StatusService.toggleStatus(knexInstance, id, value).then((response) =>
      res.json(response)
    );
  });

StatusRouter.route("/name").get((req, res, next) => {
  const { id } = req.query;

  const knexInstance = req.app.get("db");

  // RETURN ALL STATUS ENTRIES

  StatusService.getStatusWithName(knexInstance)
    .then((results) => {
      let response = results;
      if (id) {
        response = response.filter((itm) => itm.clientid === Number(id));
      }
      return res.status(201).json(response);
    })
    .catch(next);
});

module.exports = StatusRouter;
