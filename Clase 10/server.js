import fs from 'node:fs/promises'
import express from 'express'

const app = express()
app.use(express.json()) // interpreta el body cuando viene un JSON

function notIgnore(product) {
  return product.deleted != true
}

function filter(productsList) {
  const productListFilter = []

  for (let i = 0; i < productsList.length; i++) {
    if (notIgnore(productsList[i])) {
      productListFilter.push(productsList[i])
    }
  }
  return productListFilter
}

async function getProductFile() {
  return fs.readFile("data/products.json", { encoding: 'utf-8' })
    .then(function (data) {
      const productsList = JSON.parse(data)
      return productsList;
    })
}

async function getProducts() {
  return getProductFile()
    .then(function (products) {
      return filter(products);
    })
}


app.get('/products', function (req, res) {
  getProducts()
    .then(function (products) {
      res.status(200).json(products)
    })
})


function findProduct(id, products) {
  let product = null

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      product = products[i]
    }
  }

  return product

}


async function getProductByID(id) {

  return getProducts()
    .then(function (products) {
      let product = findProduct(id, products)

      if (product) {
        return product
      }
      else {
        throw { code: 404, msg: "El producto no se encuentra en el sistema." }
      }
    })

}

app.get('/products/:idProduct', function (req, res) {
  const { idProduct } = req.params

  getProductByID(idProduct)
    .then(function (product) {
      return res.status(200).json(product)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo guardar en el archivo" })
      }
    })
})

app.post('/products', function (req, res) {
  let productsList = []
  const product = {
    name: req.body.name,
    description: req.body.description
  }

  fs.readFile("data/products.json", { encoding: "utf-8" })
    .then(function (data) {
      // aca se ejecutar una vez terminado de leer
      productsList = JSON.parse(data)
      product.id = productsList[productsList.length - 1].id + 1
      productsList.push(product)

      return fs.writeFile('data/products.json', JSON.stringify(productsList), { encoding: 'utf-8' })
    })
    .then(function () {
      res.status(201).json(product)
    })
    .catch(function (err) {
      res.status(500).json({ msg: "No se pudo guardar en el archivo" })
    })
})

// put es reemplazar
app.put('/products/:idProduct', function (req, res) {

  const { idProduct } = req.params
  // proparo el objeto
  const product = {
    name: req.body.name,
    description: req.body.description
  }

  fs.readFile("data/products.json", { encoding: "utf-8" })
    .then(function (data) {
      const productsList = JSON.parse(data)

      let indexProduct = -1

      for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].id == idProduct) {
          indexProduct = i
        }
      }

      if (indexProduct != -1) {
        // reemplazo el objeto
        productsList[indexProduct] = {
          ...product, // spread
          id: productsList[indexProduct].id
        }

        return fs.writeFile('data/products.json', JSON.stringify(productsList), { encoding: 'utf-8' })
      }
      else {
        throw { code: 404, msg: "No se encuentra ese producto" }
      }
    })
    .then(function () {
      res.status(201).json(product)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo guardar en el archivo" })
      }
    })



  // busco el objeto
  let indexProduct = -1

  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id == idProduct) {
      indexProduct = i
    }
  }

  if (indexProduct != -1) {
    // reemplazo el objeto
    productsList[indexProduct] = {
      ...product, // spread
      id: productsList[indexProduct].id
    }

    res.status(200).json(productsList[indexProduct])
  }
  else {
    res.status(404).json({ msg: `El producto #${idProduct} no existe` })
  }
})

// patch -- actualizar
app.patch('/products/:idProduct', function (req, res) {
  // const idProduct = req.params.idProduct
  const { idProduct } = req.params
  // proparo el objeto
  const product = {}

  if (req.body.name) {
    product.name = req.body.name
  }

  if (req.body.description) {
    product.description = req.body.description
  }



  // busco el objeto
  let indexProduct = -1

  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id == idProduct) {
      indexProduct = i
    }
  }

  if (indexProduct != -1) {
    // reemplazo el objeto
    productsList[indexProduct] = {
      ...productsList[indexProduct],
      ...product, // spread
      id: productsList[indexProduct].id
    }

    res.status(200).json(productsList[indexProduct])
  }
  else {
    res.status(404).json({ msg: `El producto #${idProduct} no existe` })
  }
})

// delete eliminar
// -- Logica
// -- Fisica

// patch -- actualizar
app.delete('/products/:idProduct', function (req, res) {
  // const idProduct = req.params.idProduct
  const { idProduct } = req.params

  // busco el objeto
  let indexProduct = -1

  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id == idProduct) {
      indexProduct = i
    }
  }

  if (indexProduct != -1) {
    // reemplazo el objeto
    productsList[indexProduct].deleted = true
    res.status(200).json(productsList[indexProduct])
  }
  else {
    res.status(404).json({ msg: `El producto #${idProduct} no existe` })
  }
})


app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})