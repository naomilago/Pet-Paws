import { Request, Response } from 'express'
import knex from '../database/connection'

class PetpointsController {
  async index(req: Request, res: Response) {
    const { city, uf, category } = req.query

    const parsedCategory = String(category)
      .split(',')
      .map(category => Number(category.trim()))

    const petpoints = await knex('petpoints')
      .join('petpoints_category', 'petpoints.id', '=', 'petpoints_category.petpoints_id')
      .whereIn('petpoints_category.category_id', parsedCategory)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('petpoints.*')

    const petpoints2 = await knex('petpoints')
      .join('petpoints_category', 'petpoints.id', '=', 'petpoints_category.petpoints_id')
      .whereIn('petpoints_category.category_id', parsedCategory)
      .distinct()
      .select('petpoints.*')

    return res.json(petpoints2)
  }
  
  async show(req: Request, res: Response) {
    const { id } = req.params

    const petpoint =await knex('petpoints').where('id', id).first()

    if (!petpoint) {
      return res.status(400).json({ message: "Petpoint not found" })
    }

    const category = await knex('category')
      .join('petpoints_category', 'category.id', '=', 'petpoints_category.category_id')
      .where('petpoints_category.petpoints_id', id)
      .select('category.title')

    return res.json({ petpoint, category })
  }

  async create(req: Request, res: Response) {
    const {
      username,
      petname,
      description,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      category
    } = req.body
  
    const trx = await knex.transaction()
  
    const petpoint = {
      image: 'https://images.unsplash.com/photo-1529927066849-79b791a69825?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      username,
      petname,
      description,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }
    
    const insertedIds = await trx('petpoints').insert(petpoint)
  
    const petpoints_id = insertedIds[0]
  
    const petpointsCategory = category.map((category_id: number) => {
      return {
        category_id,
        petpoints_id
      }
    })
  
    await trx('petpoints_category').insert(petpointsCategory)

    await trx.commit()
   
    return res.json({ 
      id: petpoints_id,
      ...petpoint
     })
  
  }
}

export default PetpointsController