const express = require('express');
const passport = require('passport');

const AuthRouter = express.Router();

AuthRouter.post('/register', passport.authenticate('register'), (req, res) => {
    res.send({ message: 'Successfully registered', user: req.user });
});

AuthRouter.post('/login', passport.authenticate('login'), (req, res) => {
    res.send({ message: 'Successfully logged in', user: req.user });
});

AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = {
    AuthRouter,
};
