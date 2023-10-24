function sumarNumeros(a, callcak_criterio) {
  let suma = 0

  for (let i = 0; i < a.length; i++) {
    suma += callcak_criterio(a[i])
  }

  return suma
}

function todos(e) {
  return e
}

function pares(e) {
  return (e % 2 === 0) ? e : 0
}

function impares(e) {
  return (e % 2 !== 0) ? e : 0
}

const arr = [10, 10, 5, 7]

console.log(sumarNumeros(arr, todos))
console.log(sumarNumeros(arr, pares))
console.log(sumarNumeros(arr, impares))
//console.log(suma2)