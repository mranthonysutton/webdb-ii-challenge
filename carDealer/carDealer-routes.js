const express = require("express");
const knex = require("../data/db-config");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Router up and running..." });
});

module.exports = router;
