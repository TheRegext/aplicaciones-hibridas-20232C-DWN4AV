
function accedio(req, res, next) {
  console.log("Accedio al: ", req.url)

  if (req.query.clave === "123") {
    next()
  }
  else {
    res.json({ msg: "No envio la clave..." })
  }

}

function isAdmin(req, res, next) {
  if (req.query.role === 'admin') {
    next()
  }
  else {
    res.status(400).json({ msg: "No tiene los permisos necesarios para realizar esta accion." })
  }
}

export {
  accedio,
  isAdmin
}