
const express = require('express');
const router = express.Router();
const userInfo = require('./usersData');
module.exports = (app) => {
    app.get('/employeeInformation', userInfo.checkAuthenticated, (req, res) => {
        var userdata = req.body;
        console.log(req.userName);
        //Check username is available or not in the database.
        if (req.userName !== 'bipsamanta@hotmail.com') { return res.status(401).send({ message: 'Invalid login' }) }//Check user name from database
        var payload = { data: 'data from database' };
        res.status(200).send({ data: payload });
    })
    return router;
}
