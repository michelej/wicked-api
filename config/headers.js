const headers = {};
headers["Access-Control-Allow-Origin"] = "*";
headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
headers['Access-Control-Allow-Methods'] = 'OPTIONS, HEAD, GET, DELETE, POST, PUT'
headers["Content-Type"] = "application/json";

module.exports = headers