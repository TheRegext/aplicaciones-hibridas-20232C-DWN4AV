import express from 'express'
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js'
import { validateCreateProduct } from '../middlewares/products.js'
import { verifySession } from '../middlewares/account.js'

const route = express.Router()

route.use('/products', [verifySession])

// route.all('/products', [verifySession])

route.get('/products', ProductsController.getProducts)
route.post('/products', [validateCreateProduct], ProductsController.createProduct)

route.get('/products/:idProduct', ProductsController.getProductByID)
route.use('/products', ProductsReviewRoute)



export default route
