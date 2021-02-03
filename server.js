const express = require('express');

const app = express();

app.use(express.static('public'));
app.enable('trust proxy'); //https://stackoverflow.com/a/49176816

app.use(function (req, res, next) {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.listen(process.env.PORT || 80, () => {
    console.log("Listening to requests on" + process.env.PORT);
});

const allowedOrigins = ["http://127.0.0.1", "https://vuetify-pwa-template.herokuapp.com/"];

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