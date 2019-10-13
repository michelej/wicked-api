const http = require('http');
const env = require('./enviroment').getEnviroment()
const router = require('./router')
const headers = require('./config/headers')
const utils = require('./config/utils')

const server = http.createServer(function (req, res) {
    let m = router.match(req.method + ' ' + req.url)
    if (m) {                   
        getBody(req, (body) => {
            req.body = body;
            m.fn(req, res, m.params)
        })
    } else {
        res.writeHead(404, headers);
        res.end()
    }
});

const getBody = (req, cb) => {
    let bodyBuffer = Buffer.from('')
    req.on('data', (data) => {        
        let auxBuffer = Buffer.from(data, 'utf8')
        bodyBuffer = Buffer.concat([bodyBuffer, auxBuffer])
    })
    req.on('end', () => {
        cb(bodyBuffer.length > 0 ? JSON.parse(bodyBuffer.toString()) : undefined)
    })
}

server.listen(env.port);
utils.printLog("Server started...")
utils.printLog("Running as: " + env.name)
utils.printLog(JSON.stringify(env,null,2))


/** NODE JS HANDLE ERROR */
process.on('uncaughtException', (err) => {
    utils.printLog(err.stack, "error")
});