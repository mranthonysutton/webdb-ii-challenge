exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "3VW2A7AU4FM046711",
          car_make: "Ford",
          car_model: "F-250",
          mileage: 65000,
          transmission_type: "Automatic",
          title_status: "Salvaged"
        },
        {
          vin: "JTDKB20U397876857",
          car_make: "Toyota",
          car_model: "4-Runner",
          mileage: 20000,
          title_status: "Clean"
        },
        {
          vin: "1D7HW42NX5S168943",
          car_make: "BMW",
          car_model: "M5",
          mileage: 40000,
          transmission_type: "Manual"
        }
      ]);
    });
};
