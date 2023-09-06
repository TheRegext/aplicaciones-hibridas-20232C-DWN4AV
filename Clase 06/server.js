import express from 'express'
// import path from 'node:path'

const app = express() // crea el servidor

// configuramos express para que sepa 
// donde se encuentra el contenido estatico
app.use('/', express.static('public'))

// me permite recibir datos en el body de una
// solicitud con urlencode
// agregamos el middleware para que express pueda 
// procesar los datos del body de la solicitud
app.use(express.urlencoded({ extended: true }))

app.get('/form', function (req, res) {
  let nombre = req.query.nombre
  res.send(`Hola ${nombre}, como estas?`)
})

app.post('/form', function (req, res) {
  let nombre = req.body.nombre
  res.send(`Hola ${nombre}, como estas?`)
})


app.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})