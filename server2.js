var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jwt-simple');

const userInfo = require('./data');

var app = express();
var port = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser())
var Names = [{ name: 'biplab' }, { Name: 'Biplab Samanta' }];
app.get('/names', (req, res) => {
    res.send(Names);
})

function checkAuthenticated(req, res, next) {
    if (!req.header('Authentication')) return res.status(401).send({ message: 'Unauthorized Access' });
    var token = req.header('Authentication').split(' ')[1];
    var payload = jwt.decode(token, 'abc');
    if (!payload) return res.status(401).send({ message: 'Unauthorized Access' });
    req.userName = payload.subject;
    next();
}

app.post('/register', (req, res) => {
    var userdata = req.body;
    if (userInfo.isAvailable(userdata.userName)) {
        return res.status(401).send({ code: 1000, message: 'User Already Available' })
    }
    else {
        userInfo.addUser(userdata.userName, userdata.password);
    }
    res.status(200).send({ message: 'Register Successfully' })
})

app.post('/login', (req, res) => {
    var userdata = req.body;
    console.log(userdata);
    if (userInfo.isAvailable(userdata.userName)) {
        var payload = { subject: userdata.userName };
        var token = jwt.encode(payload, 'abc');
        res.status(200).send({ token: token });
    }
    else { return res.status(401).send({ message: 'Invalid login' }) }

})
app.get('/employeeInformation', checkAuthenticated, (req, res) => {
    var userdata = req.body;
    console.log(req.userName);
    //Check username is available or not in the database.
    if (req.userName !== 'bipsamanta@hotmail.com') { return res.status(401).send({ message: 'Invalid login' }) }//Check user name from database
    var payload = { data: 'data from database' };
    res.status(200).send({ data: payload });
})
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);