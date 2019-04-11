
var jwt = require('jwt-simple');
const express = require('express');
const router = express.Router();
const userInfo = require('./usersData');
module.exports = (app) => {
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
    app.get('/test', (req, res) => {
        var payload = { data: 'test' };
        res.status(200).send({ data: payload });
    })
    return router;
}
