const db = require('../db/mongodb')
const utils = require('../config/utils')

const saveNewAmountMoney = async (doc) => {
    try {
        doc = mapAmountMoney(doc)
        if(doc._id===undefined){
            await db.save("moneyLog", doc)
        }else{
            let id = doc._id
            delete doc._id
            await db.update("moneyLog", doc,id)
        }
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const getAllMoneyRecords = async (params) => {
    try {
        let resp = await db.load("moneyLog")
        resp.sort((a,b) => b.date-a.date)
        return resp
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const getMoney = async (id) => {
    try {
        return await db.findByID("moneyLog", id)
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const deleteMoney = async (id) => {
    try {
        await db.remove("moneyLog", id)
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const mapAmountMoney = (doc) => {
    try {
        doc.creationDate = new Date()
        doc.date = new Date(doc.date)                
        if (!(doc.type === 'expenses' || doc.type === 'income')) throw new Error("Type must be (expenses) or (income)")
        return doc
    } catch (error) {
        throw new Error("mapping fields : " + error.stack)
    }
}

const getAllCategories = async () => {
    try {
        let resp = await db.loadOne("webConfig")
        return resp.categories
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const getAllUsers = async () => {
    try {
        let resp = await db.load("authData")
        return resp.map(e => ({ name : e.user}))
    } catch (err) {
        utils.printLog('Error during operation: ' + err.stack)
        throw new Error(err)
    }
}

const authenticate = async (user, pass) => {
    try {
        let res = await db.findOne("authData", { "user": user })
        return res != null && res.password == pass
    } catch (error) {
        throw new Error("mapping fields : " + error.stack)
    }
}


module.exports = { saveNewAmountMoney, getAllMoneyRecords, authenticate, deleteMoney, getAllCategories ,getAllUsers , getMoney }