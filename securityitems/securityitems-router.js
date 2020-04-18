const express = require('express');
const SecurityItemsService = require('./securityitems-service');
const CategoriesService = require('../categories/categories-service');
const ClientsService = require('../clients/clients-service');
const StatusService = require('../status/status-service');

const SecurityItemsRouter = express.Router();
const jsonParser = express.json();

SecurityItemsRouter.route('/')
    .get((req, res, next) => {

        const knexInstance = req.app.get('db');

        SecurityItemsService.getSecurityItems(knexInstance)
            .then(results => res.status(200).json(results))
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { name, category } = req.body;

        if (!name) {
            return res.status(400).json({ error: "A name is required!" })
        }
        if (!category) {
            return res.status(400).json({ error: 'A category is required!' })
        }

        const knexInstance = req.app.get('db');

        // VERIFY CATEGORY EXISTS

        CategoriesService.getCategoryById(knexInstance, category)
            .then((results) => {
                if (results.length === 0) {
                    return res.status(403).json({ error: "Category does not exist!" });
                }

                // VERIFY NO DUPLICATE SECURITY ITEMS EXIST

                SecurityItemsService.getSecurityItem(knexInstance, name)
                    .then((results) => {
                        if (results.length !== 0) {
                            return res.status(400).json({ error: 'Security Item already exists!' })
                        }
                        // INSERT INTO SECURITY ITEMS TABLE

                        SecurityItemsService.addSecurityItem(knexInstance, name, category)
                            .then(results => {

                                // ASSIGN NEW SECURITY ITEM ID TO VARIABLE

                                const { id } = results;

                                // GET LIST OF CLIENT IDS

                                ClientsService.getClients(knexInstance)
                                    .then(results => {
                                        // VERIFY CLIENTS EXIST
                                        if (results.length) {

                                            // ITERATE THROUGH CLIENTS AND INSERT NEW VALUES INTO STATUS TABLE
                                            results.map(result => {
                                                StatusService.addStatus(knexInstance, result.id, id)
                                            })
                                        }

                                        return res.status(201).json({ notification: 'Success!' });

                                    })
                            })
                    })
            })
    })

module.exports = SecurityItemsRouter;