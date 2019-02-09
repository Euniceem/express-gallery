
exports.up = function (knex, Promise) {
  return knex.schema.createTable('photos', function (table) {
    table.increments().primary();
    table.integer('user_id').references('id').inTable('users')
    table.string('author', 255).notNullable();
    table.string('title', 255).notNullable();
    table.string('link', 500).notNullable();
    table.string('description', 1000).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('photos');
}

