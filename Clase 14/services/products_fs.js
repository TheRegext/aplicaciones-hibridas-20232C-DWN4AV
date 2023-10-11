import fs from 'node:fs/promises'

const ENTITY_NAME = 'products'

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
  return fs.readFile(`data/${ENTITY_NAME}.json`, { encoding: 'utf-8' })
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

export {
  getProducts,
  getProductByID
}

export default {
  getProducts,
  getProductByID
}