const http = require('http');
const env = require('./enviroment').getEnviroment()
const router = require('./router')
const headers = require('./config/headers')

const server = http.createServer(function (req, res) {
    let m = router.match(req.method + ' ' + req.url)
    if (m) {        
        console.log(m)        
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
console.log("Server started...")

/** NODE JS HANDLE ERROR */
process.on('uncaughtException', (err) => {
    console.error(err.stack, "error")
});