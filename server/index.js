require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const app = express();

massive(process.env.DB_CONNECTION_STRING, { scripts: __dirname + '/db' })
    .then(dbInstance => {
        console.log('Connected to the db');
        app.set('db', dbInstance);
    })
    .catch(e => {
        console.error(e);
    });

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
}, (req, username, password, done) => {
    const db = app.get('db');
    const { email } = req.body;

    db.query(`
        select * from "Users"
        where email ilike \${email}
            OR username ilike \${username}
    `, { username, email })
        .then(users => {
            if (users.length > 0) {
                return done('Username or email is already in use');
            }

            bcrypt.hash(password, 15, (err, hashedPassword) => {
                if (err) {
                    return done('System failure');
                }

                db.Users.insert({
                    ...req.body,
                    password: hashedPassword,
                    role_id: 3,
                })
                    .then(user => {
                        delete user.password;

                        done(null, user);
                    })
                    .catch(err => {
                        console.warn(err);
                        done('System failure');
                    });
            });
        })
        .catch(err => {
            console.warn(err);
            done('System failure');
        });
}));

passport.use('login', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    const db = app.get('db');

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
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const db = app.get('db');

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
});


app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.post('/auth/register', passport.authenticate('register'), (req, res) => {
    res.send({ message: 'Successfully registered', user: req.user });
});

app.post('/auth/login', passport.authenticate('login'), (req, res) => {
    res.send({ message: 'Successfully logged in', user: req.user });
});

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
});

app.get('/api/me', (req, res) => {
    res.send(req.user);
});

app.get('/api/memes', (req, res) => {
    const db = app.get('db');

    db.Memes.find()
        .then(memes => {
            res.send(memes);
        });
});

app.post('/api/memes', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Please log in before continuing' });
    }
    
    const db = app.get('db');
    const newMeme = req.body;
    
    db.Memes.insert(newMeme)
        .then(() => {
            return db.Memes.find();
        })
        .then(memes => {
            res.status(201).send(memes);
        });
});

app.put('/api/memes/:id', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Please log in before continuing' });
    }

    const { id } = req.params;
    const update = {
        ...req.body,
        id,
    };
    const db = app.get('db');

    db.Memes.update(update)
        .then(() => {
            return db.Memes.find();
        })
        .then(memes => {
            res.send(memes);
        })
        .catch(err => {
            console.warn(err);
            res.status(500).send('System failure');
        });
});

app.delete('/api/memes/:id', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'Please log in before continuing' });
    }

    const { id } = req.params;
    const db = app.get('db');

    db.Memes.destroy(id)
        .then(() => {
            return db.Memes.find();
        })
        .then(memes => {
            res.send(memes);
        })
        .catch(err => {
            console.warn(err);
            res.status(500).send('System failure');
        });
});

app.get('/api/memes/:id', (req, res) => {
    const { id } = req.params;
    const db = app.get('db');

    db.Memes.find(id)
        .then(meme => {
            if (!meme) {
                return res.status(404).send({ message: 'No meme found with id ' + id });
            }
        
            res.send(meme);
        });

});


app.listen(8000, () => {
    console.log('The meme machine back-end is running at localhost:8000');
});
