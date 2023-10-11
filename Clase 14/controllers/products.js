/*
import {
  getProducts as getProductService,
  getProductByID as getProductByIDService
} from "../services/products.js"
*/

import ProductsService from "../services/products.js"

function getProducts(req, res) {

  ProductsService.getProducts(req.query)
    .then(function (products) {
      res.status(200).json(products)
    })
}

function getProductByID(req, res) {
  const { idProduct } = req.params

  ProductsService.getProductByID(idProduct)
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
}

async function createProduct(req, res) {
  return ProductsService.createProduct(req.body)
    .then(function (product) {
      res.status(201).json(product)
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg })
    })
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