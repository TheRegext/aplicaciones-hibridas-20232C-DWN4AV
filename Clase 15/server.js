import express from 'express'
import ProductsRoute from './routes/products.js'
import AccountRoute from './routes/account.js'
import cors from 'cors'

const app = express()
app.use(cors()) // cualquiera pueda acceder al API
app.use(express.json()) // interpreta el body cuando viene un JSON
app.use(express.static('public'))

app.use(ProductsRoute)
app.use('/api', AccountRoute)

app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})