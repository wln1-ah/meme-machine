require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();

massive(process.env.DB_CONNECTION_STRING, { scripts: __dirname + '/db' })
    .then(dbInstance => {
        app.set('db', dbInstance);
    })
    .catch(e => {
        console.error(e);
    });

const memes = [];
const getNewId = (() => {
    let id = 0;
    return () => ++id;
})();


app.use(cors());
app.use(bodyParser.json());


app.get('/api/memes', (req, res) => {
    const db = app.get('db');

    db.Memes.find()
        .then(memes => {
            res.send(memes);
        });
});

app.post('/api/memes', (req, res) => {
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
    const update = req.body;
    const { id } = req.params;

    const oldMemeIndex = memes.findIndex(m => m.id == id);

    if (oldMemeIndex == -1) {
        return res.status(404).send({ message: 'No meme found with id ' + id });
    }

    memes[oldMemeIndex] = {
        ...memes[oldMemeIndex],
        ...update,
    };

    res.send(memes);
});

app.delete('/api/memes/:id', (req, res) => {
    const { id } = req.params;

    const oldMemeIndex = memes.findIndex(m => m.id == id);

    if (oldMemeIndex == -1) {
        return res.status(404).send({ message: 'No meme found with id ' + id });
    }

    memes.splice(oldMemeIndex, 1);

    res.send(memes);
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
