function sumarNumeros(a, callcak_criterio) {
  let suma = 0

  for (let i = 0; i < a.length; i++) {
    suma += callcak_criterio(a[i])
  }

  return suma
}

const arr = [10, 10, 5, 7]

console.log(sumarNumeros(arr, e => e))
console.log(sumarNumeros(arr, e => (e % 2 === 0) ? e : 0))
console.log(sumarNumeros(arr, e => (e % 2 !== 0) ? e : 0))
//console.log(suma2)

/// estas funciones son funciones creadoras y tienen contexto
/// tradicionales funciones
function a(b) {
  return b
}

/// fuyncitones anonimas (expresiones funcionales)
const data = function (b) {
  return b
}

/// expresiones funciones no creadoras y no tienen contexto

const data2 = (a, c) => {
  return b + c
}

const data3 = a => {
  return a
}

const data5 = a => a + 10