import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_20232C")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const ProductReviewsCollection = db.collection('products_reviews')

async function findReviews(idProduct) {
  await client.connect()

  return ProductReviewsCollection.find({ product_id: new ObjectId(idProduct) }).toArray()
}

async function createReview(idProduct, review) {
  await client.connect()

  const newReview = {
    ...review,
    product_id: new ObjectId(idProduct)
  }

  await ProductReviewsCollection.insertOne(newReview)

  return newReview
}

export default {
  findReviews,
  createReview
}