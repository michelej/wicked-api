const db = require('../db/mongodb')
const utils = require('../config/utils')


const saveNewAmountMoney = async ( doc ) => {
    try {        
        doc = mapAmountMoney(doc)         
        await db.save("moneyLog",doc)        
    } catch (err) { 
        utils.printLog('Error during operation: '+ err.stack) 
        throw new Error(err)
    }
}

const getAllMoneyRecords = async ( params ) => {
    try {               
        let resp = await db.load("moneyLog")        
        return resp
    } catch (err) { 
        utils.printLog('Error during operation: '+ err.stack) 
        throw new Error(err)
    }
}

const deleteMoney = async ( id ) => {
    try {                
        await db.remove("moneyLog",id)        
    } catch (err) { 
        utils.printLog('Error during operation: '+ err.stack) 
        throw new Error(err)
    }
}

const mapAmountMoney = (doc) => {
    try{
        if(doc.amount==undefined || doc.date==undefined  || doc.type==undefined  
            || doc.description==undefined  || doc.origin==undefined  || doc.categories==undefined || doc.type==undefined ) throw new Error("Missing fields")
        doc.creationDate = new Date()        
        doc.date = new Date(doc.creationDate)                
        if( !(doc.type === 'expenses' || doc.type === 'income') ) throw new Error("Type must be (expenses) or (income)")
        return doc
    }catch(error){
        throw new Error("mapping fields : "+error.stack)
    }    
}

const getAllCategories = async ( ) => {
    try {               
        let resp = await db.loadOne("webConfig")         
        return resp.categories
    } catch (err) { 
        utils.printLog('Error during operation: '+ err.stack) 
        throw new Error(err)
    }
}


const authenticate = async (user,pass) => {    
    try{               
        let res = await db.findOne("authData",{"user":user})        
        return res!=null && res.password == pass        
    }catch(error){
        throw new Error("mapping fields : "+error.stack)
    }    
}


module.exports = { saveNewAmountMoney , getAllMoneyRecords , authenticate , deleteMoney ,getAllCategories}