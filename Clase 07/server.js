import express from 'express'
const app = express()
app.use(express.json()) // interpreta el body cuando viene un JSON

// URI: /products -- urlencode

const productsList = [
  {
    id: 1,
    name: "Café Expreso",
    description: "Un café fuerte y aromático, elaborado rápidamente al hacer pasar agua caliente a presión a través de café molido finamente."
  },
  {
    id: 2,
    name: "Café Latte",
    description: "Un café suave con más leche que café. Generalmente se sirve con un shot de espresso y tres partes de leche al vapor."
  },
  {
    id: 3,
    name: "Café Capuchino",
    description: "Similar al Latte, pero con más espuma de leche en la parte superior. Lleva su nombre por el parecido con la vestimenta de los frailes capuchinos."
  },
  {
    id: 4,
    name: "Café Americano",
    description: "Un café hecho al diluir un espresso con agua caliente, lo que le da un sabor similar al café filtrado pero con diferentes matices."
  },
  {
    id: 5,
    name: "Café Mocha",
    description: "Un delicioso café que combina chocolate, un shot de espresso y leche al vapor. A menudo se sirve con nata montada en la parte superior."
  }
]

app.get('/products', function (req, res) {
  res.status(200).json(productsList)
})

/// /products/1
/// /products/2
/// /products/3

/// query -> ? -- filtrar
/// params -> URI -- id recurso
/// Body -> cuerpo del mensaje -- recurso

app.get('/products/:idProduct', function (req, res) {
  //  const idProduct = req.params.idProduct
  const { idProduct } = req.params

  let product = null

  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id == idProduct) {
      product = productsList[i]
    }
  }

  if (product) {
    return res.status(200).json(product)
  }
  else {
    return res.status(404).json({ msg: `No se encuentra el producto #${idProduct}` })
  }
})


// crear - agregar uno nuevo
/// /products/new -- existe un recurso llamado como new
/// /prodycts/:id -- existe un recuros con ese id al cual le vamos a agregar algo

app.post('/products', function (req, res) {

  const product = {
    id: productsList.length + 1,
    name: req.body.name,
    description: req.body.description
  }

  productsList.push(product)

  res.status(201).json(product)

})

// put es reemplazar
// delete eliminar

// patch



app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})