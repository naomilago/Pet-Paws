import Knex from 'knex'

export async function seed(knex: Knex) {
  await knex('category').insert([
    { title: 'Cachorro', image: 'dog.svg' },
    { title: 'Gato', image: 'cat.svg' },
    { title: 'Hamster', image: 'hamster.svg' },
    { title: 'Pássaro', image: 'parrot.svg' },
    { title: 'Peixe de aquário', image: 'fish-tank.svg' },
    { title: 'Tartaruga', image: 'turtle.svg' }
  ])
}