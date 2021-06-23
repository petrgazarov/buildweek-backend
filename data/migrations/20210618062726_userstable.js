exports.up = function (knex) {
    return knex.schema
      .createTable("users", tbl => {
        tbl.increments();
        tbl.varchar("username", 128).notNullable().unique();
        tbl.varchar("password", 256).notNullable();
        tbl.varchar("email", 256).notNullable(); 
      });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("users")
  };