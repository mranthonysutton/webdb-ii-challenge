const express = require("express");
const helmet = require("helmet");

const CarRouter = require("../carDealer/carDealer-routes.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/car/", CarRouter);

server.get("/", (req, res) => {
  res.send("<h3>API Running...</h3>");
});

module.exports = server;
