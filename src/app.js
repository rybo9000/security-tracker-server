require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const CategoriesRouter = require("../categories/categories-router.js");
const ClientsRouter = require("../clients/clients-router.js");
const SecurityItemsRouter = require("../securityitems/securityitems-router.js");
const StatusRouter = require("../status/status-router.js");
const { NODE_ENV } = require("./config");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

// MIDDLEWARE
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// ROUTER
app.use("/api/categories", CategoriesRouter);
app.use("/api/clients", ClientsRouter);
app.use("/api/securityitems", SecurityItemsRouter);
app.use("/api/status", StatusRouter);

// ERROR HANDLING
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
