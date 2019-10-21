const router = require('routes')();
const env = require('./enviroment').getEnviroment()
const db = require('./db/mongodb')
const headers = require('./config/headers')
const utils = require('./config/utils')
const logic = require('./services/logic')

router.addRoute('GET ', async function (req, res, params) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ "message": "ok" }));
});

router.addRoute('GET '+env.basepathAPI+'/auth', async function (req, res, params) {
    try{
        let auth = req.headers['authorization'].split(" ")
        let credentials=new Buffer(auth[1],'base64').toString().split(":")        
        let at = await logic.authenticate(credentials[0],credentials[1])        
        if(at){
           res.writeHead(200, headers);
           res.end(JSON.stringify({ "message": "ok" }));
        }else{
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }           
    }catch(error){
        res.writeHead(500, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }            
});

router.addRoute('POST ' + env.basepathAPI + '/money/save', async function (req, res, params) {
    try {
        await logic.saveNewAmountMoney(req.body)
        res.writeHead(200, headers);
        res.end(JSON.stringify({ "message": "ok" }));
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('POST ' + env.basepathAPI + '/money/list', async function (req, res, params) {
    try {
        let resp = await logic.getAllMoneyRecords(req.body)
        res.writeHead(200, headers);
        res.end(JSON.stringify(resp));
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});


/*router.addRoute('GET ' + env.basepathAPI + '/load', async function(req, res, params) {
    const result = await db.load()
    res.writeHead(200, headers);
    res.end(JSON.stringify(result));
});




router.addRoute('POST ' + env.basepathAPI + '/save', async function(req, res, params) {
    const result = await db.save(req.body)
    res.writeHead(200, headers);
    res.end(JSON.stringify(result));
});


router.addRoute('GET ' + env.basepathAPI + '/remove/:id', async function(req, res, params) {
    const result = await db.remove(params.id)
    res.writeHead(200, headers);
    res.end(JSON.stringify(result));
});*/


router.addRoute('OPTIONS /*', (req, res) => {
    res.writeHead(200, headers)
    res.end();
});

const handleResponse = (error, result, req, res) => {
    if (!error) {
        res.writeHead(200, headers);
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(error.code, headers);
        res.end(JSON.stringify(error));
    }
}

module.exports = router