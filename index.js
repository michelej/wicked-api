var express = require("express");
var app = express();
const db = require('./database')


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port " + process.env.PORT || 3000);
});

app.get("/", async (req, res, next) => {
    let response = await db.loadOne("webConfig")
    res.json(response);
});