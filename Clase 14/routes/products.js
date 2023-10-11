import express from 'express'
import ProductsController from '../controllers/products.js'
import ProductsReviewRoute from './productsReviews.js'

const route = express.Router()

route.get('/products', ProductsController.getProducts)
route.post('/products', ProductsController.createProduct)
route.get('/products/:idProduct', ProductsController.getProductByID)

route.use('/products', ProductsReviewRoute)



export default route
