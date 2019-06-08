const express = require('express');
const passport = require('passport');

const AuthRouter = express.Router();

AuthRouter.post(
    '/register',
    passport.authenticate('register', { failWithError: true }),
    (req, res) => {
        res.send({ message: 'Successfully registered', user: req.user });
    },
    // Because of the four parameters, this is now an error handler and the error will be passed in first
    (error, req, res, next) => {
        // if the username or email is already being used, send that kind of failure status
        if (error == 'Username or email is already in use') {
            return res.status(400).send({ message: error });
        }

        // or if there was an error inside of the strategy anywhere, send a response with that message
        if (error == 'System failure') {
            return res.status(500).send({ message: error });
        }

        // otherwise, let express take care of it
        next(error);
    },
);

AuthRouter.post(
    '/login',
    passport.authenticate('login'),
    (req, res) => {
        res.send({ message: 'Successfully logged in', user: req.user });
    },
    (error, req, res, next) => {
        // if the username or password is incorrect, fail with the right kind of error
        if (error == 'Username or password is incorrect') {
            return res.status(401).send({ message: error });
        }

        // or if there was an error inside of the strategy anywhere, send a response with that message
        if (error == 'System failure') {
            return res.status(500).send({ message: error });
        }

        // otherwise, let express take care of it
        next(error);
    },
);

AuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

module.exports = {
    AuthRouter,
};
