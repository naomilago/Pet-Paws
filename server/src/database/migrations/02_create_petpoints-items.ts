import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('petpoints_category', table => {
    table.increments('id').primary()
    table.integer('petpoints_id').notNullable().references('id').inTable('petpoints')
    table.integer('category_id').notNullable().references('id').inTable('category')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('petpoints_category')
}