const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const { addDb } = require('./add-db.middleware');

function decorate(app) {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(addDb());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname + '/../../build'));
}

module.exports = {
    decorate,
};
