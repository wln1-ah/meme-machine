const express = require('express');

const ApiRouter = express.Router();

ApiRouter.get('/memes', (req, res) => {
    req.db.Memes.find()
        .then(memes => {
            res.send(memes);
        });
});

ApiRouter.get('/memes/:id', (req, res) => {
    const { id } = req.params;
    const db = req.db;

    db.Memes.find(id)
        .then(meme => {
            if (!meme) {
                return res.status(404).send({ message: 'No meme found with id ' + id });
            }
        
            res.send(meme);
        });
});

ApiRouter.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ message: 'You must be logged in to access this resource' });
    }

    next();
});

ApiRouter.get('/me', (req, res) => {
    res.send(req.user);
});

ApiRouter.post('/memes', (req, res) => {
    const db = req.db;
    const newMeme = req.body;
    
    db.Memes.insert(newMeme)
        .then(() => {
            return db.Memes.find();
        })
        .then(memes => {
            res.status(201).send(memes);
        });
});

ApiRouter.put('/memes/:id', (req, res) => {
    const { id } = req.params;
    const update = {
        ...req.body,
        id,
    };
    const db = req.db;

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

ApiRouter.delete('/memes/:id', (req, res) => {
    const { id } = req.params;
    const db = req.db;

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

module.exports = {
    ApiRouter,
};
