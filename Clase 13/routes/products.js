import express from 'express'
import ProductsController from '../controllers/products.js'

const route = express.Router()

route.get('/products', ProductsController.getProducts)
route.post('/products', ProductsController.createProduct)
route.get('/products/:idProduct', ProductsController.getProductByID)



export default route
