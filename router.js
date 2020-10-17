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

router.addRoute('GET ' + env.basepathAPI + '/auth', async function (req, res, params) {
    try {
        let auth = req.headers['authorization'].split(" ")
        let credentials = Buffer.from(auth[1], 'base64').toString().split(":")
        let at = await logic.authenticate(credentials[0], credentials[1])
        if (at) {
            res.writeHead(200, headers);
            res.end(JSON.stringify({ "message": "ok" }));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(500, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('POST ' + env.basepathAPI + '/money', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            await logic.saveNewAmountMoney(req.body)
            res.writeHead(200, headers);
            res.end(JSON.stringify({ "message": "ok" }));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('GET ' + env.basepathAPI + '/money/get/:id', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let r = await logic.getMoney(params.id)            
            res.writeHead(200, headers);
            res.end(JSON.stringify(r));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('DELETE ' + env.basepathAPI + '/money/:id', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            await logic.deleteMoney(params.id)
            res.writeHead(200, headers);
            res.end(JSON.stringify({ "message": "ok" }));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('POST ' + env.basepathAPI + '/money/list', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllMoneyRecords(req.body)
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});


router.addRoute('GET ' + env.basepathAPI + '/money/categories', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllCategories()
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('GET ' + env.basepathAPI + '/money/sources', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllMoneySources()
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('GET ' + env.basepathAPI + '/users', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllUsers()
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});


router.addRoute('POST ' + env.basepathAPI + '/budget', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            await logic.saveNewBudget(req.body)
            res.writeHead(200, headers);
            res.end(JSON.stringify({ "message": "ok" }));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('POST ' + env.basepathAPI + '/budget/money-logs', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllMoneyRecordsForBudget(req.body)
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('DELETE ' + env.basepathAPI + '/budget/:id', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            await logic.deleteBudget(params.id)
            res.writeHead(200, headers);
            res.end(JSON.stringify({ "message": "ok" }));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});


router.addRoute('POST ' + env.basepathAPI + '/budget/list', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let resp = await logic.getAllBudgets(req.body)
            res.writeHead(200, headers);
            res.end(JSON.stringify(resp));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
});

router.addRoute('GET ' + env.basepathAPI + '/budget/get/:id', async function (req, res, params) {
    try {
        if (await checkAuthentication(req)) {
            let r = await logic.getBudget(params.id)            
            res.writeHead(200, headers);
            res.end(JSON.stringify(r));
        } else {
            res.writeHead(401, headers);
            res.end(JSON.stringify({ "message": "authentication failed." }));
        }
    } catch (error) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ "error": error.stack }));
    }
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

const checkAuthentication = async (req) => {
    if (req.headers['authorization']) {
        const auth = req.headers['authorization'].split(" ")
        const credentials = Buffer.from(auth[1], 'base64').toString().split(":")
        return await logic.authenticate(credentials[0], credentials[1])
    } else {
        return false
    }
}


module.exports = router