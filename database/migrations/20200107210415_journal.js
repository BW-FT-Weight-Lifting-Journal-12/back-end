exports.up = function(knex) {
    return knex.schema.createTable('journal', table => {
        table.increments();

        table
        .integer('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

        table
        .string('exercise', 20)
        .notNullable();
  
        table
        .string('weight', 10)
        .notNullable();
  
        table
        .integer('reps')
        .notNullable();
  
        table
        .integer('sets')
        .notNullable();
  
        table
        .string('date', 20)
        .notNullable();

        table
        .string('muscle', 20)
        .notNullable();

        table
        .string('journal', 128)
        .notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('journal')
  };