/// commonjs
// const calculos = require('./calculos.js') // importar un modulo

// ES Module
//import calculos from './calculos.mjs' // objeto por defecto

import { sumar, PI } from './calculos.js' // la funcion particular

//  8
let res = sumar(parseInt(process.argv[2]), parseInt(process.argv[3])) * PI

console.log("Resultado: ", res)





