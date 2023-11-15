import { MongoClient, ObjectId } from "mongodb"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_20232C")// se conecta magicamente y hace un use (mentira no pasa es...xD)
const AccountsCollection = db.collection('accounts')
const TokensCollection = db.collection('tokens')

async function createAccount(account) {
  await client.connect()

  const newAccount = {
    ...account
  }

  newAccount.password = await bcrypt.hash(account.password, await bcrypt.genSalt(10))

  await AccountsCollection.insertOne(newAccount)
}

async function verifyAccount(account) {
  await client.connect()

  let accountData = await AccountsCollection.findOne({ email: account.email })

  if (!accountData) {
    throw { msg: "No se encuentra el email en la base de datos" }
  }

  if (!await bcrypt.compare(account.password, accountData.password)) {
    throw { msg: "El password es incorrecto" }
  }

  return { ...account, password: undefined }

}

async function createToken(payload) {
  const token = jwt.sign(payload, "CLAVE SECRETA")
  TokensCollection.insertOne({ token, email: payload.email })
  return token
}


async function createSession(account) {
  return {
    account: await verifyAccount(account),
    token: await createToken({ ...account, password: undefined })
  }
}

async function verifyToken(token) {
  await client.connect()
  const payload = jwt.verify(token, "CLAVE SECRETA")

  if (!await TokensCollection.findOne({ token })) {
    throw { msg: "El token no esta en la base de datos" }
  }

  return payload
}

async function deleteSession(token) {
  await client.connect()

  return await TokensCollection.deleteOne({ token })
}

export default {
  createAccount,
  createSession,
  deleteSession,
  verifyToken

}