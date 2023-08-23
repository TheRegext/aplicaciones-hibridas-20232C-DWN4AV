import path from 'node:path'

const ruta = path.join('img/', './profile/105.236.jpg');

console.log(ruta)

// 'img/profile/105236.jpg'
console.log(path.dirname(ruta))
console.log(path.basename(ruta))
console.log(path.extname(ruta))

console.log(path.resolve('img/', './profile/105.236.jpg'))



