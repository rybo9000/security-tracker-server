const express = require("express");
const CategoriesService = require("./categories-service");

const CategoriesRouter = express.Router();
const jsonParser = express.json();

CategoriesRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");

    // RETURN ALL CATEGORIES

    CategoriesService.getCategories(knexInstance)
      .then((results) => res.status(200).json(results))
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "The name is required!" });
    }

    // CHECK IF CATEGORY ALREADY EXISTS

    const knexInstance = req.app.get("db");

    CategoriesService.findDuplicateCategory(knexInstance, name)
      .then((results) => {
        if (results.length !== 0) {
          return res.status(403).json({ error: "Category already exists!" });
        }
        // INSERT CATEGORY INTO DATABASE

        CategoriesService.addCategory(knexInstance, name)
          .then((result) => res.json(result))
          .catch(next);
      })
      .catch(next);
  });

module.exports = CategoriesRouter;
