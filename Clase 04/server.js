import express from 'express'
import path from 'node:path'

const app = express() // crea el servidor

app.get('/', function (req, res) {
  res.send("<h1>Hola Mundo</h1>")
})

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.resolve('favicon.png'))
})

app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})