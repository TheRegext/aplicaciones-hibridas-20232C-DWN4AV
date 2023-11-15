import express from 'express'
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js'
import { validateCreateProduct } from '../middlewares/products.js'
import { verifySession } from '../middlewares/account.js'

const route = express.Router()

route.get('/products', [verifySession], ProductsController.getProducts)
route.post('/products', [validateCreateProduct], ProductsController.createProduct)
route.get('/products/:idProduct', ProductsController.getProductByID)

route.use('/products', ProductsReviewRoute)



export default route
