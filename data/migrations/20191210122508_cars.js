exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("vin")
      .notNullable()
      .unique()
      .index();
    tbl.string("car_make").notNullable();
    tbl.string("car_model").notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("transmission_type");
    tbl.string("title_status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
