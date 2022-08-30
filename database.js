const MongoClient = require('mongodb').MongoClient
const {ObjectId} = require('mongodb');

let db

let env = {}
env.mongoDB = {
    url: "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@"+process.env.MONGO_SERVER+"/test?retryWrites=true&w=majority",
    bd: "WickedDB"
}

const getDB = async () => db ? db : db = (conn = await MongoClient.connect(env.mongoDB.url,{ useNewUrlParser: true })).db(env.mongoDB.bd)

const load = async (collection) => (await (await getDB()).collection(collection).find({}).toArray());

const loadOne = async (collection) => (await (await getDB()).collection(collection).findOne({}));

const save = async (collection,json) => (await (await getDB()).collection(collection).insertOne(json));

const update = async (collection,json,id) => (await (await getDB()).collection(collection).updateOne({'_id':ObjectId(id)},{$set:json}));

const remove = async (collection,id) => (await (await getDB()).collection(collection).deleteOne({ "_id" : ObjectId(id) }));

const findByID = async (collection , id) => (await (await getDB()).collection(collection).findOne({ "_id" : ObjectId(id) }));

const findOne = async (collection , query) => (await (await getDB()).collection(collection).findOne(query));

module.exports = { load , save , remove , findOne , loadOne , findByID , update}