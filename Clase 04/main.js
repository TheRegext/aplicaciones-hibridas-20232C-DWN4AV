import http from 'node:http'
import fs from 'node:fs'

const server = http.createServer(function (request, response) {
  console.log("Alguien se conecto!")

  if (request.url === '/') {
    response.setHeader('Content-Type', 'text/html');
    response.write("<h1>Hola Mundo!</h1>")
    response.write("<h2>Esto es el inicio de la pagina!</h2>")
    response.end()
  }
  else if (request.url === '/hola') {
    response.setHeader('Content-Type', 'text/html');
    response.write("<h1>Hola Mundo!</h1>")
    response.write("<h2>hola que hace!</h2>")
    response.end()
  }
  else if (request.url === '/favicon.ico') {
    fs.readFile('./favicon.png', function (err, data) {
      if (!err) {
        response.write(data)
        response.end();
      }
      else {
        response.end()
      }
    })
  }
  else {
    response.setHeader('Content-Type', 'text/html');
    response.write("<h1>Hola Mundo!</h1>")
    response.write("<h2>Pagina no encontrada!</h2>")
    response.end()
  }

  console.log("URL: ", request.url)


})


server.listen(2023, function () {
  console.log("El servidor esta levantado! http://localhost:2023")
})
