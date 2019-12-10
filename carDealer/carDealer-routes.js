const express = require("express");
const knex = require("../data/db-config");

const router = express.Router();

function validateCarId(req, res, next) {
  knex
    .select("*")
    .from("cars")
    .where({ id: req.params.id })
    .first()
    .then(car => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(404).json({ error: "The specified ID does not exist." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to obtain the specified ID." });
    });
}

function validateAddCar(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ error: "No information passed to add the new vehicle." });
  } else {
    if (!req.body.vin) {
      res.status(400).json({ error: "Please supply a vin for the vehicle." });
    } else if (!req.body.car_make) {
      res
        .status(400)
        .json({ error: "Please supply a car make for the vehicle." });
    } else if (!req.body.car_model) {
      res
        .status(400)
        .json({ error: "Please supply the car model for the vehicle." });
    } else if (!req.body.mileage) {
      res
        .status(400)
        .json({ error: "Please supply the mileage for the vehicle." });
    } else {
      req.carData = req.body;
      next();
    }
  }
}

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to retrieve a list of cars." });
    });
});

router.get("/:id", validateCarId, (req, res) => {
  res.send(req.car);
});

router.post("/", validateAddCar, (req, res) => {
  const carData = req.carData;

  knex("cars")
    .insert(carData, "id")
    .then(ids => {
      const id = ids[0];

      return knex("cars")
        .select("*")
        .where({ id })
        .first()
        .then(response => {
          res.status(201).json(response);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Unable to add the new vehicle" });
    });
});

module.exports = router;
