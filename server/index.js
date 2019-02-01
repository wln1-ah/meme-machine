const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const memes = [];
const getNewId = (() => {
    let id = 0;
    return () => ++id;
})();


app.use(cors());
app.use(bodyParser.json());



app.get('/api/memes', (request, response) => {
    response.send(memes);
});

app.post('/api/memes', (req, res) => {
    const newMeme = req.body;
    newMeme.id = getNewId();

    memes.push(newMeme);

    res.send(memes);
    // res.send(newMeme);
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

    const meme = memes.find(m => m.id == id);

    if (!meme) {
        return res.status(404).send({ message: 'No meme found with id ' + id });
    }

    res.send(meme);
});


app.listen(8000, () => {
    console.log('The meme machine back-end is running at localhost:8000');
});
