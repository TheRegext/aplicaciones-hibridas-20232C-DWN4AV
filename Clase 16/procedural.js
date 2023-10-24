function sumarNumeros(a) {
  let suma = 0

  for (let i = 0; i < a.length; i++) {
    suma += a[i]
  }

  return suma
}

function sumarPares(a) {
  let suma = 0

  for (let i = 0; i < a.length; i++) {
    suma += (a[i] % 2 === 0) ? a[i] : 0
  }

  return suma
}

function sumarImpares(a) {
  let suma = 0

  for (let i = 0; i < a.length; i++) {
    suma += (a[i] % 2 !== 0) ? a[i] : 0
  }

  return suma
}


const arr = [10, 10, 5, 7]

let suma = sumarNumeros(arr)
let sumaPares = sumarPares(arr)
let sumaImpares = sumarImpares(arr)

console.log(suma)
console.log(sumaPares)
console.log(sumaImpares)