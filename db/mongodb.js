const MongoClient = require('mongodb').MongoClient
const {ObjectId} = require('mongodb');
const env = require('../enviroment').getEnviroment()
let db

const getDB = async () => db ? db : db = (conn = await MongoClient.connect(env.mongoDB.url,{ useNewUrlParser: true })).db(env.mongoDB.bd)

const load = async () => (await (await getDB()).collection('tmp').find({}).toArray());

const save = async (json) => (await (await getDB()).collection('tmp').insertOne(json));

const remove = async (id) => (await (await getDB()).collection('tmp').deleteOne({ "_id" : ObjectId(id) }));

module.exports = { load , save , remove}