async function A() {
  console.log("EJECUTA A")
  //throw "Error A"
  return 15;
}

async function F() {
  return 10;
}

async function G() {
  return 11;
}

async function B() {
  console.log("EJECUTA B")
  try {
    let valorFinal = await A() + await F() + await G();

  }
  catch (err) {
    valorFinal = 0
  }
  finally {

  }

  return valorFinal
  /*
    return A()
    .then(function(valor){
      valorFinal += valor
      return F()
    })
    .then(function(valor){
      valorFinal += valor
      return G()
    })
    .then(function(valor){
      return valor + 10
    });
  */

  /*
  return A()
  .then(function(data){
    return data + 100
  })
  .then(function(data){
    return data - 120
  })
  .catch(function(){
    throw "Error mal"
  })
  */
}


B()
  .then(function (data) {
    console.log("SE EJECUTA CUANDO TERMINE B: ", data)
  })
  .catch(function (err) {
    console.log("CATCH B: ", err)
  })
  .finally(function () {

  })

