import express from 'express'
import ProductsReviewsController from '../controllers/productsReview.js'

const route = express.Router()

route.route('/:idProduct/reviews')
  .get(ProductsReviewsController.getReviews)
  .post(ProductsReviewsController.createReview)


export default route