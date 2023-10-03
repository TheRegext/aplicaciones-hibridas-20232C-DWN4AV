import { MongoClient, ObjectId } from 'mongodb'


const client = new MongoClient('mongodb://127.0.0.1:27017')

client.connect()
  .then(async function () {
    console.log("Conectado al servidor")
    const db = client.db("AH_20232C")

    /*
    db.collection("Users")
    .insertOne({
      name: 'Mongo User 2',
      type: "System"
    })
    */

    /*
    const doc = await db.collection("Users")
      .findOne({ _id: new ObjectId("651c953708369b7d84c84e5f") })

    console.log(doc)*/

    /*
        const docs = await db.collection("Users").find({ type: "Alumno" }).toArray()
    
        console.log(docs)
    
    */
    const update = await db.collection("Users").updateOne({ _id: new ObjectId("651ca3f9e84ac1831ebf461e") }, {
      $set: {
        name: "Usuario nuevo"
      }
    })


    console.log(update)


  })
  .catch(function (err) {
    console.log("No me pude conectar :( ", err)
  })
  .finally(function () {
    client.close()
  })