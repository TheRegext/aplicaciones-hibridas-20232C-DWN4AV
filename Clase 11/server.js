import express from 'express'
import ProductsRoute from './routes/products.js'

const app = express()
app.use(express.json()) // interpreta el body cuando viene un JSON

app.use(ProductsRoute)

app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})