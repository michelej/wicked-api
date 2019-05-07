const router = require('routes')();
const env = require('./enviroment').getEnviroment()
const db = require('./db/mongodb')
const headers = require('./config/headers')

router.addRoute('GET ' + env.basepathAPI + '/load', async function(req, res, params) {
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
});


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