import express from 'express'

import PetpointsController from './controllers/PetpointsController'
import CategoryController from './controllers/CategoryController'

const routes = express.Router()
const petpointsController = new PetpointsController()
const categoryController = new CategoryController()

routes.get('/category', categoryController.index)

routes.post('/petpoints', petpointsController.create)
routes.get('/petpoints', petpointsController.index)
routes.get('/petpoints/:id', petpointsController.show)

export default routes