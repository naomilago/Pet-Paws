import { Request, Response } from 'express'
import knex from '../database/connection'

class CategoryController {
  async index(req: Request, res: Response) {
    const category = await knex('category').select('*')
  
    const serializedCategory = category.map(category => {
      return {
        id: category.id,
        title: category.title,
        image_url: `http://localhost:3333/uploads/${category.image}`
      }
    })
  
    return res.json(serializedCategory)
  }
}

export default CategoryController