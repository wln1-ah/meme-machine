const passport = require('passport');

const { loginStrategy } = require('./login.strategy');
const { registerStrategy } = require('./register.strategy');

const { connectToDb } = require('../db/bootstrap.database');

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    connectToDb()
        .then(db => {
            db.Users.find(id)
                .then(user => {
                    if (!user) return done(null, undefined);
        
                    delete user.password;
        
                    return done(null, user);
                })
                .catch(err => {
                    console.warn(err);
                    done('System failure');
                });
        })
        .catch(err => {
            done('System failure');
        });
});
