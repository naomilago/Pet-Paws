import express from 'express'

import multer from 'multer'
import multerConfig from './config/multer'

import PetpointsController from './controllers/PetpointsController'
import CategoryController from './controllers/CategoryController'

const routes = express.Router()
const upload = multer(multerConfig)

const petpointsController = new PetpointsController()
const categoryController = new CategoryController()

routes.get('/category', categoryController.index)

routes.post('/petpoints', upload.single('image'), petpointsController.create)
routes.get('/petpoints', petpointsController.index)
routes.get('/petpoints/:id', petpointsController.show)

export default routes