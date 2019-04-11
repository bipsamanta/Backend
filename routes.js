const express = require('express');
const router = express.Router();
const path = require('path');


const Routes = function (app) {
    const adminRoutes = require('./modules/app/users');
    const employeeRoutes = require('./modules/app/employee');
    app.use('/users', adminRoutes(app));
    app.use('/employees', employeeRoutes(app));
};

module.exports = Routes;
