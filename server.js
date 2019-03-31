const bodyParser = require('body-parser');
const express = require('express');
var cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())

const login = require('./login')(app);

const httpServer = http.createServer(app);
const port = process.env.PORT || 3001;
httpServer.listen(port, () => {
    console.log('Example app listening on port 3001!');
});

module.exports = app;
