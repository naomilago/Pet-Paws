import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('petpoints', table => {
    table.increments('id').primary()
    table.string('image').notNullable()
    table.string('username').notNullable()
    table.string('petname').notNullable()
    table.string('description').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('petpoints')
}