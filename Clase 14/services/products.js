import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_20232C")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const ProductCollection = db.collection('products')

function filterQueryToMongo(filter) {
  const filterMongo = {}

  for (const filed in filter) {
    if (isNaN(filter[filed])) {
      filterMongo[filed] = filter[filed]
    }
    else {
      const [field, op] = filed.split('_')

      if (!op) {
        filterMongo[filed] = parseInt(filter[filed])
      }
      else {
        if (op === 'min') {
          filterMongo[field] = {
            $gte: parseInt(filter[filed])
          }
        }
        else if (op === 'max') {
          filterMongo[field] = {
            $lte: parseInt(filter[filed])
          }
        }
      }
    }
  }

  return filterMongo
}

async function getProducts(filter = {}) {
  await client.connect()

  const filterMongo = filterQueryToMongo(filter)

  return ProductCollection.find(filterMongo).toArray()
}

async function getProductByID(id) {
  await client.connect()
  return ProductCollection.findOne({ _id: new ObjectId(id) })
}

async function createProduct(product) {
  await client.connect()
  const newProduct = { ...product }

  /// side effect
  await ProductCollection.insertOne(newProduct)

  return newProduct
}

export {
  getProducts,
  getProductByID,
  createProduct
}

export default {
  getProducts,
  getProductByID,
  createProduct
}