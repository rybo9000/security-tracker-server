const express = require("express");
const ClientsService = require("./clients-service");
const SecurityItemsService = require("../securityitems/securityitems-service");
const StatusService = require("../status/status-service");

const ClientsRouter = express.Router();
const jsonParser = express.json();

ClientsRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");

    ClientsService.getClients(knexInstance)
      .then((results) => res.status(200).json(results))
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "The name is required!" });
    }

    // CHECK IF NAME ALREADY EXISTS

    const knexInstance = req.app.get("db");

    ClientsService.findDuplicateClient(knexInstance, name)
      .then((results) => {
        if (results.length !== 0) {
          return res.status(403).json({ error: "Client already exists!" });
        }
        // INSERT NAME INTO DATABASE

        ClientsService.addClient(knexInstance, name)
          .then((result) => {
            const { id } = result;
            // ITERATE THROUGH EXISTING SECURITY ITEMS
            SecurityItemsService.getSecurityItems(knexInstance).then(
              (results) => {
                // IF THERE ARE EXISTING SECURITY ITEMS ADD THE ENTRIES INTO THE STATUS TABLE
                if (results.length) {
                  results.map((result) => {
                    StatusService.addStatus(knexInstance, id, result.id);
                  });
                }
                res.status(201).json({ notification: "Success!" });
              }
            );
          })
          .catch(next);
      })
      .catch(next);
  });

ClientsRouter.route("/:id").get((req, res, next) => {
  const { id } = req.params;

  console.log(id);

  const knexInstance = req.app.get("db");

  ClientsService.getNameFromId(knexInstance, id)
    .then((results) => res.status(200).json(results))
    .catch(next);
});

module.exports = ClientsRouter;
