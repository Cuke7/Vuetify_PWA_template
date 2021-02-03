const express = require('express');

const app = express()
const port = 8000;

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const allowedOrigins = ["http://127.0.0.1:8000"];

app.get("/get_data/", get_data);
app.get("/get_data", get_data);

function get_data(req, resp) {
    // Allow CORS stuff
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        resp.setHeader('Access-Control-Allow-Origin', origin);
    }
    resp.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    resp.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    resp.setHeader("Access-Control-Allow-Credentials", true);

    (async () => {
        let results = await get_data_promise();
        resp.json(results);
    })().catch((err) => resp.json(null));
}

function get_data_promise() {
    return new Promise(function (resolve, reject) {
        resolve('Some dummy data from the server');
    });
}