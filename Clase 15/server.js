import express from 'express'
import ProductsRoute from './routes/products.js'
import ProductsService from './services/products.js'
import cors from 'cors'

const app = express()
app.use(cors()) // cualquiera pueda acceder al API
app.use(express.json()) // interpreta el body cuando viene un JSON
app.use(express.static('public'))

app.use(ProductsRoute)

/// si es dinamico, el servidor debe renderizarlo
app.get('/productos', function (req, res) {
  ProductsService.getProducts()
    .then(function (products) {
      let productList = '<ul>'
      for (let i = 0; i < products.length; i++) {
        productList += `
        <li>
          Nombre: ${products[i].name}
          Descripcion: ${products[i].description}
        </li>
      `
      }

      productList += '</ul>'

      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi pagina Web!</title>
        <link rel="stylesheet" href="css/styles.css">
      </head>
      <body>
          ${productList}
      </body>
      </html>
    `)
    })
})



app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})