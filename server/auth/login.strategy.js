const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, (req, email, password, done) => {
    const db = req.db;

    db.Users.find({ email })
        .then(users => {
            if (users.length == 0) {
                return done('Username or password is incorrect');
            }

            const user = users[0];

            bcrypt.compare(password, user.password, (err, isSame) => {
                if (err) {
                    return done('System failure');
                }

                if (!isSame) {
                    return done('Username or password is incorrect');
                }

                delete user.password;

                done(null, user);
            });
        })
        .catch(err => {
            console.warn(err);
            done('System failure');
        });
});

module.exports = {
    loginStrategy,
};