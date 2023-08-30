import express from 'express'
// import path from 'node:path'

const app = express() // crea el servidor

// configuramos express para que sepa 
// donde se encuentra el contenido estatico
app.use('/', express.static('public'))

// me permite recibir datos en el body de una
// solicitud con urlencode
app.use(express.urlencoded({ extended: true }))

app.get('/form', function (req, res) {
  let nombre = req.query.nombre
  res.send(`Hola ${nombre}, como estas?`)
})

app.post('/form', function (req, res) {
  let nombre = req.body.nombre
  res.send(`Hola ${nombre}, como estas?`)
})


/*
app.get('/', function (req, res) {
  res.sendFile(path.resolve('home.html'))
})

app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.resolve('favicon.png'))
})

app.get('/logo.png', function (req, res) {
  res.sendFile(path.resolve('logo.png'))
})
*/

// crea un endpoint que lear un archivo json y lo filtre con los parametros del req.query
// /api/usuarios?nombre=pepe&apellido=argento

// index.js
app.get('/api/usuarios', function (req, res) {
  let usuarios = require('./usuarios.json')
  let nombre = req.query.nombre
  let apellido = req.query.apellido
  let resultado = filtrarUsuarios(usuarios, nombre, apellido)

  res.json(resultado)
})

app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})