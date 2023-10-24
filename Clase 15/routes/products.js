import express from 'express'
import { accedio, isAdmin } from '../middlewares/acceso.js'
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js'
import { validateCreateProduct } from '../middlewares/products.js'

const route = express.Router()

route.get('/products', [], ProductsController.getProducts)
route.post('/products', [validateCreateProduct], ProductsController.createProduct)
route.get('/products/:idProduct', ProductsController.getProductByID)

route.use('/products', ProductsReviewRoute)



export default route
